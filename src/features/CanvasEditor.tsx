import { DndProvider } from 'react-dnd';
import { useEffect, useState, useRef } from 'react';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ComponentManager } from './componentManager/ComponentManager';
import { componentTypes } from './widgetsManager/component';
import CanvasContainer from './canvasEditor/CanvasContainer';
import { CustomDraggerLayer } from './canvasEditor/CustomDraggerLayer';
import { isEqual, debounce } from 'lodash';
import { IAppDefination } from './types';
import { v4 as uuid } from 'uuid';

const defaultPageId = uuid();
const defaultDefinition = {
  showViewerNavigation: true,
  homePageId: defaultPageId,
  pages: {
    [defaultPageId]: {
      components: {},
      handle: 'home',
      name: 'Home'
    }
  },
  globalSettings: {
    hideHeader: false,
    appInMaintenance: false,
    canvasMaxWidth: 1292,
    canvasMaxWidthType: 'px',
    canvasMaxHeight: 2400,
    canvasBackgroundColor: '#edeff5',
    backgroundFxQuery: ''
  }
};

const CanvasEditor = () => {
  const canvasContainerRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>(defaultPageId);
  const [appDefinition, setAppDefinition] =
    useState<IAppDefination>(defaultDefinition);
  const [rendering, setRendering] = useState(false);

  const zoomLevel = 1;

  useEffect(() => {
    const run = debounce(() => {
      setRendering(true);
    }, 500);
    run();
  }, []);

  useEffect(() => {
    if (!currentPage) {
      setCurrentPage(uuid());
    }
  }, [currentPage]);

  const appDefinitionChanged = (newDefinition: IAppDefination) => {
    if (isEqual(appDefinition, newDefinition)) return;
    console.log('newDefin', newDefinition);
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
                    {rendering && (
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
                    )}
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
