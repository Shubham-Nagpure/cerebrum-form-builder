import { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { CustomButton as Button } from '../coreComponent/Button';
import { CustomForm as Form } from '../coreComponent/Form';
import { IWidget } from '../types';

type Props = {
  id: number;
  inCanvas: boolean;
  preview: () => void;
  width: number;
  height: number;
  component: IWidget;
  onComponentClick: boolean;
  onEvent: () => void;
  onComponentOptionChanged: () => void;
  onComponentOptionsChanged: () => void;
  changeCanDrag: boolean;
  canvasWidth: number;
  mode: string;
  parentId: number;
};

const AllComponents: Record<string, React.FC> = {
  Button,
  Form
};

const Box = (props: Props) => {
  const {
    // id,
    inCanvas,
    // preview,
    // width,
    // height,
    component
    // onComponentClick,
    // onEvent,
    // onComponentOptionChanged,
    // onComponentOptionsChanged,
    // mode,
    // parentId
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
  const [resetComponent, setResetStatus] = useState(false);

  useEffect(() => {
    if (resetComponent) setResetStatus(false);
  }, [resetComponent]);

  // useEffect(() => {
  //   setRenderCount(renderCount + 1);
  //   if (renderCount > 10) {
  //     setRenderCount(0);
  //     const currentTime = new Date();
  //     const number = currentTime - renderStartTime;
  //     const timeDifference = Math.abs(number);
  //     if (timeDifference < 1000) {
  //       throw Error;
  //     }
  //     setRenderStartTime(currentTime);
  //   }
  // }, [JSON.stringify({})]);

  return (
    <Tooltip placement="top">
      <div style={{ ...styles }}>
        {inCanvas ? (
          !resetComponent ? (
            <ComponentToRender />
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
              >
                <center>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundSize: 'contain',
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
