import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { AddNewAppDefination, IWidget } from '../features/types';
import { ReactElement } from 'react';

export function computeComponentName(
  componentType: IWidget,
  currentComponents: AddNewAppDefination
) {
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
  componentMeta: IWidget,
  eventMonitorObject: ReactElement,
  currentComponents: AddNewAppDefination,
  canvasBoundingRect: ReactElement,
  currentLayout: string,
  shouldSnapToGrid: boolean,
  zoomLevel: number,
  isInSubContainer: boolean = false,
  addingDefault: boolean = false
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

export function snapToGrid(canvasWidth: number, x: number, y: number) {
  const gridX = canvasWidth / 43;

  const snappedX = Math.round(x / gridX) * gridX;
  const snappedY = Math.round(y / 10) * 10;
  return [snappedX, snappedY];
}
