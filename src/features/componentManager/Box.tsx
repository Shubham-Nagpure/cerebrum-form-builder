import { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { IWidget } from '../types';
import AllComponents from '../coreComponent';

type Props = {
  /**Component is present in canvas */
  inCanvas: boolean | undefined;
  /**Config properties of component */
  component: IWidget;
};

/**
 * Box
 *
 * Description: It return the Box with the name of component if it not in canvas
 * and when drag into canvas return the core component
 */
const Box = (props: Props) => {
  const { inCanvas, component } = props;
  let styles = {
    height: '100%',
    padding: '1px'
  };

  if (inCanvas) {
    styles = {
      ...styles
    };
  }

  /**
   * This return JSX of the component that need to drag
   */
  const ComponentToRender = AllComponents[component.component];
  const [resetComponent, setResetStatus] = useState(false);

  useEffect(() => {
    if (resetComponent) setResetStatus(false);
  }, [resetComponent]);

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
