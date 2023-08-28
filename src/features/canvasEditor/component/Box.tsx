import { useState, useEffect, useMemo, useRef } from 'react';
import { Tooltip } from 'antd';
import { CustomButton as Button } from '../../coreComponent/Button';
import { CustomForm as Form } from '../../coreComponent/Form';

type Props = {
  id: number;
  inCanvas: boolean;
  preview: () => void;
  width: number;
  height: number;
  component: object;
  onComponentClick: boolean;
  onEvent: () => void;
  onComponentOptionChanged: () => void;
  onComponentOptionsChanged: () => void;
  //   paramUpdated;
  changeCanDrag: boolean;
  //   containerProps;
  //   darkMode;
  //   removeComponent;
  canvasWidth: number;
  mode: string;
  //   customResolvables;
  parentId: number;
  //   sideBarDebugger;
  //   readOnly;
  //   childComponents;
};
const AllComponents: {
  Button: () => JSX.Element;
  Form: () => JSX.Element;
} = {
  Button,
  Form
};

const Box = (props: Props) => {
  const {
    id,
    inCanvas,
    preview,
    width,
    height,
    component,
    onComponentClick,
    onEvent,
    onComponentOptionChanged,
    onComponentOptionsChanged,
    mode,
    parentId
  } = props;
  let styles = {
    height: '100%',
    padding: '1px'
  };

  if (inCanvas) {
    styles = {
      ...styles
    };
  }

  const ComponentToRender = AllComponents[component.component];
  const [renderCount, setRenderCount] = useState(0);
  const [renderStartTime, setRenderStartTime] = useState(new Date());
  const [resetComponent, setResetStatus] = useState(false);

  const componentActions = useRef(new Set());

  useEffect(() => {
    if (resetComponent) setResetStatus(false);
  }, [resetComponent]);

  useEffect(() => {
    setRenderCount(renderCount + 1);
    if (renderCount > 10) {
      setRenderCount(0);
      const currentTime: Date = new Date();
      const number = currentTime - renderStartTime;
      const timeDifference = Math.abs(number);
      if (timeDifference < 1000) {
        throw Error;
      }
      setRenderStartTime(currentTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify({})]);

  //   function renderTooltip({ props, text }) {
  //     if (text === '') return <></>;
  //     return (
  //       <Tooltip id="button-tooltip" {...props}>
  //         {text}
  //       </Tooltip>
  //     );
  //   }

  return (
    <Tooltip
      placement={inCanvas ? '' : 'top'}
      delay={{ show: 500, hide: 0 }}
      //   trigger={inCanvas && true ? null : ['hover', 'focus']}
      //   overlay={props => {
      //     return renderTooltip({
      //       props,
      //       text: inCanvas ? `inCanvas` : `${component.description}`
      //     });
      //   }}
    >
      <div style={{ ...styles }} role={preview ? 'BoxPreview' : 'Box'}>
        {inCanvas ? (
          !resetComponent ? (
            <ComponentToRender
              onComponentClick={onComponentClick}
              width={width}
              onComponentOptionChanged={onComponentOptionChanged}
              // currentState={currentState}
              onEvent={onEvent}
              id={id}
              //   paramUpdated={paramUpdated}
              //   changeCanDrag={changeCanDrag}
              onComponentOptionsChanged={onComponentOptionsChanged}
              height={height}
              component={component}
              //   removeComponent={removeComponent}
              parentId={parentId}
              //   customResolvables={customResolvables}
              // variablesExposedForPreview={variablesExposedForPreview}
              // exposeToCodeHinter={exposeToCodeHinter}
              mode={mode}
              resetComponent={() => setResetStatus(true)}
              //   childComponents={childComponents}
              //   dataCy={`draggable-widget-${String(component.name).toLowerCase()}`}
              // registerAction={(actionName, func, dependencies = []) => {
              //   if (
              //     Object.keys(currentState?.components ?? {}).includes(
              //       component.name
              //     ) &&
              //     currentState?.components[component.name].id === id
              //   ) {
              //     if (!Object.keys(exposedVariables).includes(actionName)) {
              //       func.dependencies = dependencies;
              //       componentActions.current.add(actionName);
              //       return onComponentOptionChanged(
              //         component,
              //         actionName,
              //         func
              //       );
              //     } else if (
              //       exposedVariables[actionName]?.dependencies?.length === 0
              //     ) {
              //       return Promise.resolve();
              //     } else if (
              //       JSON.stringify(dependencies) !==
              //         JSON.stringify(
              //           exposedVariables[actionName]?.dependencies
              //         ) ||
              //       !componentActions.current.has(actionName)
              //     ) {
              //       func.dependencies = dependencies;
              //       componentActions.current.add(actionName);
              //       return onComponentOptionChanged(
              //         component,
              //         actionName,
              //         func
              //       );
              //     }
              //   }
              // }}
            />
          ) : (
            <></>
          )
        ) : (
          <>
            <div
              className="m-1"
              style={{ height: '76px', width: '76px', marginLeft: '18px' }}
            >
              <div
                className="component-image-holder p-2 d-flex flex-column justify-content-center"
                style={{ height: '100%' }}
                // data-cy={`widget-list-box-${component.displayName
                //   .toLowerCase()
                //   .replace(/\s+/g, '-')}`}
              >
                <center>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundSize: 'contain',
                      //   backgroundImage: `url(assets/images/icons/widgets/${component.name.toLowerCase()}.svg)`,
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>
                </center>
                <span className="component-title">{component.displayName}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Tooltip>
  );
};

export default Box;
