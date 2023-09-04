import { DndProvider } from 'react-dnd';
import { useEffect, useState, useRef } from 'react';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ComponentManager } from './componentManager/ComponentManager';
import { componentTypes } from './widgetsManager/component';
import CanvasContainer from './canvasEditor/CanvasContainer';
import { CustomDraggerLayer } from './canvasEditor/CustomDraggerLayer';
import { isEqual } from 'lodash';
import { IAppDefination } from './types';
import { v4 as uuid } from 'uuid';

/**
 * Create unique value of id
 */
const defaultPageId = uuid();

/**
 * Default JSON for app object
 */
const defaultDefinition = {
  showViewerNavigation: true,
  homePageId: defaultPageId,
  /**
   * Object of pages with component details
   */
  pages: {
    [defaultPageId]: {
      components: {},
      handle: 'home',
      name: 'Home'
    }
  },
  /**
   * Global setting of canvas UI
   */
  globalSettings: {
    hideHeader: false,
    canvasMaxWidth: 1292,
    canvasMaxWidthType: 'px',
    canvasMaxHeight: 2400,
    canvasBackgroundColor: '#edeff5',
    backgroundFxQuery: ''
  }
};

/**
 * CanvasEditor
 *
 * Description: This return entire canvas and component library
 */

const CanvasEditor = () => {
  const canvasContainerRef = useRef<HTMLInputElement>(null);
  /**
   * set isDragging when component Drag
   */
  const [isDragging, setIsDragging] = useState(false);
  /**
   * set the current Page
   */
  const [currentPage, setCurrentPage] = useState<string>(defaultPageId);
  /**
   * set the app Definition of the project
   */
  const [appDefinition, setAppDefinition] =
    useState<IAppDefination>(defaultDefinition);
  /**
   * set rendering till page gets loaded for first time
   *  - this is now working  but incase for the first time if
   *    component is does not drag the we have to add it
   */
  // const [rendering, setRendering] = useState(stubTrue);

  const zoomLevel = 1;

  /**
   * Wait for 500 seconds to page get loaded
   * - this is now working  but incase for the first time if
   *    component is does not drag the we have to add it
   */
  useEffect(() => {
    // const run = debounce(() => {
    //   setRendering(true);
    // }, 500);
    // run();
  }, []);

  useEffect(() => {
    if (!currentPage) {
      setCurrentPage(uuid());
    }
  }, [currentPage]);

  /**
   * set the new app definition
   * @param newDefinition - newDefinition of IAppDefination Interface
   * @returns
   */
  const appDefinitionChanged = (newDefinition: IAppDefination) => {
    if (isEqual(appDefinition, newDefinition)) return;
    setAppDefinition({ ...newDefinition });
  };

  return (
    <>
      <div className="editor wrapper">
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <div className="sub-section">
            <div className={`main main-editor-canvas `} id="main-editor-canvas">
              <div
                className="canvas-container align-items-center"
                style={{
                  transform: `scale(1.0)`,

                  height: '80%',
                  background: '#f4f6fa'
                }}
                onMouseUp={() => {
                  console.log('On Mouse Cllicks');
                }}
                ref={canvasContainerRef}
              >
                <>
                  <div
                    className="canvas-area"
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: 'translateZ(0)',
                      backgroundColor: '#edeff5'
                    }}
                  >
                    {/* {true && ( */}
                    <>
                      <CanvasContainer
                        canvasWidth={1090}
                        appDefinition={appDefinition}
                        appDefinitionChanged={appDefinitionChanged}
                        snapToGrid={true}
                        mode={'edit'}
                        zoomLevel={zoomLevel}
                        deviceWindowWidth={100}
                        currentPageId={currentPage}
                        // setSelectedComponents={setSelectedComponents}
                      />
                      <CustomDraggerLayer
                        canvasWidth={1090}
                        onDragging={() => {
                          setIsDragging(isDragging);
                        }}
                      />
                    </>
                    {/* )} */}
                  </div>
                </>
              </div>
            </div>
            <div className="editor-sidebar">
              <ComponentManager
                componentTypes={componentTypes}
                zoomLevel={zoomLevel}
              />
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default CanvasEditor;
