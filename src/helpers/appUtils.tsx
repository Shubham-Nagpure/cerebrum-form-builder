import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';

function resolveCode(
  code,
  state,
  customObjects = {},
  withError = false,
  reservedKeyword,
  isJsCode
) {
  let result = '';
  let error;

  // dont resolve if code starts with "queries." and ends with "run()"
  if (code.startsWith('queries.') && code.endsWith('run()')) {
    error = `Cannot resolve function call ${code}`;
  } else {
    try {
      const evalFunction = Function(
        [
          'variables',
          'components',
          'queries',
          'globals',
          'page',
          'client',
          'server',
          'moment',
          '_',
          ...Object.keys(customObjects),
          reservedKeyword
        ],
        `return ${code}`
      );
      result = evalFunction(
        isJsCode ? state?.variables : undefined,
        isJsCode ? state?.components : undefined,
        isJsCode ? state?.queries : undefined,
        isJsCode ? state?.globals : undefined,
        isJsCode ? state?.page : undefined,
        isJsCode ? undefined : state?.client,
        isJsCode ? undefined : state?.server,
        moment,
        _,
        ...Object.values(customObjects),
        null
      );
    } catch (err) {
      error = err;
    }
  }

  if (withError) return [result, error];
  return result;
}
export function resolveString(
  str,
  state,
  customObjects,
  reservedKeyword,
  withError,
  forPreviewBox
) {
  let resolvedStr = str;

  // Resolve {{object}}
  const codeRegex = /(\{\{.+?\}\})/g;
  const codeMatches = resolvedStr.match(codeRegex);

  if (codeMatches) {
    codeMatches.forEach(codeMatch => {
      const code = codeMatch.replace('{{', '').replace('}}', '');

      if (reservedKeyword.includes(code)) {
        resolvedStr = resolvedStr.replace(codeMatch, '');
      } else {
        const resolvedCode = resolveCode(
          code,
          state,
          customObjects,
          withError,
          reservedKeyword,
          true
        );
        if (forPreviewBox) {
          resolvedStr = resolvedStr.replace(codeMatch, resolvedCode[0]);
        } else {
          resolvedStr = resolvedStr.replace(codeMatch, resolvedCode);
        }
      }
    });
  }

  // Resolve %%object%%
  const serverRegex = /(%%.+?%%)/g;
  const serverMatches = resolvedStr.match(serverRegex);

  if (serverMatches) {
    serverMatches.forEach(serverMatch => {
      const code = serverMatch.replace(/%%/g, '');

      if (code.includes('server.') && !/^server\.[A-Za-z0-9]+$/.test(code)) {
        resolvedStr = resolvedStr.replace(serverMatch, 'HiddenEnvironmentVariable');
      } else {
        const resolvedCode = resolveCode(
          code,
          state,
          customObjects,
          withError,
          reservedKeyword,
          false
        );
        if (forPreviewBox) {
          resolvedStr = resolvedStr.replace(serverMatch, resolvedCode[0]);
        } else {
          resolvedStr = resolvedStr.replace(serverMatch, resolvedCode);
        }
      }
    });
  }

  return resolvedStr;
}

export function getDynamicVariables(text) {
  const matchedParams = text.match(/\{\{(.*?)\}\}/g) || text.match(/\%\%(.*?)\%\%/g);
  return matchedParams;
}

export function resolveReferences(
  object,
  state,
  defaultValue,
  customObjects = {},
  withError = false,
  forPreviewBox = false
) {
  if (object === '{{{}}}') return '';
  const reservedKeyword = ['app']; //Keywords that slows down the app
  object = _.clone(object);
  const objectType = typeof object;
  let error;
  switch (objectType) {
    case 'string': {
      if (
        object.includes('{{') &&
        object.includes('}}') &&
        object.includes('%%') &&
        object.includes('%%')
      ) {
        object = resolveString(
          object,
          state,
          customObjects,
          reservedKeyword,
          withError,
          forPreviewBox
        );
      }

      if (object.startsWith('{{') && object.endsWith('}}')) {
        const code = object.replace('{{', '').replace('}}', '');

        if (reservedKeyword.includes(code)) {
          error = `${code} is a reserved keyword`;
          return [{}, error];
        }

        return resolveCode(
          code,
          state,
          customObjects,
          withError,
          reservedKeyword,
          true
        );
      } else if (object.startsWith('%%') && object.endsWith('%%')) {
        const code = object.replaceAll('%%', '');

        if (
          code.includes('server.') &&
          !new RegExp('^server.[A-Za-z0-9]+$').test(code)
        ) {
          error = `${code} is invalid. Server variables can't be used like this`;
          return [{}, error];
        }

        return resolveCode(
          code,
          state,
          customObjects,
          withError,
          reservedKeyword,
          false
        );
      }

      const dynamicVariables = getDynamicVariables(object);

      if (dynamicVariables) {
        if (dynamicVariables.length === 1 && dynamicVariables[0] === object) {
          object = resolveReferences(
            dynamicVariables[0],
            state,
            null,
            customObjects
          );
        } else {
          for (const dynamicVariable of dynamicVariables) {
            const value = resolveReferences(
              dynamicVariable,
              state,
              null,
              customObjects
            );
            if (typeof value !== 'function') {
              object = object.replace(dynamicVariable, value);
            }
          }
        }
      }
      if (withError) return [object, error];
      return object;
    }

    case 'object': {
      if (Array.isArray(object)) {
        const new_array = [];

        object.forEach((element, index) => {
          const resolved_object = resolveReferences(element, state);
          new_array[index] = resolved_object;
        });

        if (withError) return [new_array, error];
        return new_array;
      } else if (!_.isEmpty(object)) {
        Object.keys(object).forEach(key => {
          const resolved_object = resolveReferences(object[key], state);
          object[key] = resolved_object;
        });
        if (withError) return [object, error];
        return object;
      }
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      if (withError) return [object, error];
      return object;
    }
  }
}

export function computeComponentName(componentType, currentComponents) {
  const currentComponentsForKind = Object.values(currentComponents).filter(
    component => component.component.component === componentType
  );
  let found = false;
  let componentName = '';
  let currentNumber = currentComponentsForKind.length + 1;

  while (!found) {
    componentName = `${componentType.toLowerCase()}${currentNumber}`;
    if (
      Object.values(currentComponents).find(
        component => component.component.name === componentName
      ) === undefined
    ) {
      found = true;
    }
    currentNumber = currentNumber + 1;
  }

  return componentName;
}

export const addNewWidgetToTheEditor = (
  componentMeta,
  eventMonitorObject,
  currentComponents,
  canvasBoundingRect,
  currentLayout,
  shouldSnapToGrid,
  zoomLevel,
  isInSubContainer = false,
  addingDefault = false
) => {
  const componentMetaData = _.cloneDeep(componentMeta);
  const componentData = _.cloneDeep(componentMetaData);

  const defaultWidth = isInSubContainer
    ? (componentMetaData.defaultSize.width * 100) / 43
    : componentMetaData.defaultSize.width;
  const defaultHeight = componentMetaData.defaultSize.height;

  componentData.name = computeComponentName(
    componentData.component,
    currentComponents
  );

  let left = 0;
  let top = 0;

  if (isInSubContainer && addingDefault) {
    const newComponent = {
      id: uuidv4(),
      component: componentData,
      layout: {
        [currentLayout]: {
          top: top,
          left: left
        }
      }
    };

    return newComponent;
  }

  const offsetFromTopOfWindow = canvasBoundingRect.top;
  const offsetFromLeftOfWindow = canvasBoundingRect.left;
  const currentOffset = eventMonitorObject.getSourceClientOffset();
  const initialClientOffset = eventMonitorObject.getInitialClientOffset();
  const delta = eventMonitorObject.getDifferenceFromInitialOffset();
  const subContainerWidth = canvasBoundingRect.width;

  left = Math.round(
    currentOffset?.x + currentOffset?.x * (1 - zoomLevel) - offsetFromLeftOfWindow
  );
  top = Math.round(
    initialClientOffset?.y -
      10 +
      delta.y +
      initialClientOffset?.y * (1 - zoomLevel) -
      offsetFromTopOfWindow
  );

  if (shouldSnapToGrid) {
    [left, top] = snapToGrid(subContainerWidth, left, top);
  }

  left = (left * 100) / subContainerWidth;

  if (currentLayout === 'mobile') {
    componentData.definition.others.showOnDesktop.value = false;
    componentData.definition.others.showOnMobile.value = true;
  }

  const widgetsWithDefaultComponents = ['Listview', 'Tabs', 'Form', 'Kanban'];

  const newComponent = {
    id: uuidv4(),
    component: componentData,
    layout: {
      [currentLayout]: {
        top: top,
        left: left,
        width: defaultWidth,
        height: defaultHeight
      }
    },

    withDefaultChildren: widgetsWithDefaultComponents.includes(
      componentData.component
    )
  };

  return newComponent;
};

export function snapToGrid(canvasWidth, x, y) {
  const gridX = canvasWidth / 43;

  const snappedX = Math.round(x / gridX) * gridX;
  const snappedY = Math.round(y / 10) * 10;
  return [snappedX, snappedY];
}
export const removeSelectedComponent = (
  pageId,
  newDefinition,
  selectedComponents
) => {
  selectedComponents.forEach(component => {
    let childComponents = [];

    if (
      newDefinition.pages[pageId].components[component.id]?.component?.component ===
      'Tabs'
    ) {
      childComponents = Object.keys(newDefinition.pages[pageId].components).filter(
        key =>
          newDefinition.pages[pageId].components[key].parent?.startsWith(
            component.id
          )
      );
    } else {
      childComponents = Object.keys(newDefinition.pages[pageId].components).filter(
        key => newDefinition.pages[pageId].components[key].parent === component.id
      );
    }

    childComponents.forEach(componentId => {
      delete newDefinition.pages[pageId].components[componentId];
    });

    delete newDefinition.pages[pageId].components[component.id];
  });
};

// export function computeComponentState(_ref, components = {}) {
//   let componentState = {};
//   const currentComponents = getCurrentState().components;
//   Object.keys(components).forEach((key) => {
//     const component = components[key];
//     const componentMeta = componentTypes.find(
//       (comp) => component.component.component === comp.component
//     );

//     const existingComponentName = Object.keys(currentComponents).find(
//       (comp) => currentComponents[comp].id === key
//     );
//     const existingValues = currentComponents[existingComponentName];

//     if (component.parent) {
//       const parentComponent = components[component.parent];
//       let isListView = false,
//         isForm = false;
//       try {
//         isListView = parentComponent.component.component === "Listview";
//         isForm = parentComponent.component.component === "Form";
//       } catch {
//         console.log("error");
//       }

//       if (!isListView && !isForm) {
//         componentState[component.component.name] = {
//           ...componentMeta.exposedVariables,
//           id: key,
//           ...existingValues,
//         };
//       }
//     } else {
//       componentState[component.component.name] = {
//         ...componentMeta.exposedVariables,
//         id: key,
//         ...existingValues,
//       };
//     }
//   });
//   useCurrentStateStore.getState().actions.setCurrentState({
//     components: {
//       ...componentState,
//     },
//   });

//   return setStateAsync(_ref, {
//     defaultComponentStateComputed: true,
//   });
// }
