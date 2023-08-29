import { DndProvider } from 'react-dnd';
import { createRef, useEffect, useState, useRef } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Button, Typography } from 'antd';
import { ComponentManager } from './componentManager/ComponentManager';
import { componentTypes } from './widgetsManager/component';
import CanvasContainer from './canvasEditor/CanvasContainer';
import { CustomDraggerLayer } from './canvasEditor/CustomDraggerLayer';
// import { useEditorStore } from './stores/canvasStore';
import { isEqual, debounce } from 'lodash';
import { v4 as uuid } from 'uuid';

const defaultDefinition = {
  showViewerNavigation: true,
  homePageId: 1,
  pages: {
    1: {
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
  // const defaultPageId = uuid();
  const canvasContainerRef = createRef();
  const downloadRef = createRef();
  const selectionRef = useRef();
  // const [isDragging, setIsDragging] = useState(false);
  const [appDefinition, setAppDefinition] = useState(defaultDefinition);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState({});
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [currentPageID, setCurrentPageID] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    const run = debounce(() => {
      setRendering(true);
    }, 500);
    run();
  }, []);

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  // useEffect(() => {
  //   console.log("CanvasContainerRef", canvasContainerRef);
  // });

  const previous = usePrevious(appDefinition);

  // useEffect(() => {
  //   console.log("previeosu ststate", previous);
  // }, [previous]);

  const appDefinitionChanged = (newDefinition, opts = {}) => {
    let currentPageId = currentPageID;
    if (isEqual(appDefinition, newDefinition)) return;
    // if (config.ENABLE_MULTIPLAYER_EDITING && !opts.skipYmapUpdate) {
    //   this.props.ymap?.set("appDef", {
    //     newDefinition,
    //     editingVersionId: this.props.editingVersion?.id,
    //   });
    // }

    if (opts?.versionChanged) {
      currentPageId = newDefinition.homePageId;

      setAppDefinition({ ...newDefinition });
      setCurrentPageID(currentPageId);
      // this.setState(
      //   {
      //     isSaving: true,
      //     currentPageId: currentPageId,
      //     appDefinition: newDefinition,
      //     appDefinitionLocalVersion: uuid(),
      //   },
      //   () => {
      //     if (!opts.skipAutoSave) this.autoSave();
      //     this.switchPage(currentPageId);
      //   }
      // );
      return;
    }

    // produce(
    //   this.state.appDefinition,
    //   (draft) => {
    //     draft.pages[currentPageId].components =
    //       newDefinition.pages[currentPageId]?.components ?? {};
    //   },
    //   this.handleAddPatch
    // );

    setAppDefinition({ ...newDefinition });
    // this.setState(
    //   {
    //     isSaving: true,
    //     appDefinition: newDefinition,
    //     appDefinitionLocalVersion: uuid(),
    //   },
    //   () => {
    //     if (!opts.skipAutoSave) this.autoSave();
    //   }
    // );
  };

  const handleComponentHover = id => {
    // if (this.state.selectionInProgress) return;
    setHoveredComponent(id);
  };
  const handleComponentClick = (id, component) => {
    setSelectedComponents({ id, component });
  };

  console.log('Get the cnavas', document.getElementsByClassName('canvas-container'));

  const exportApp = () => {
    console.log('App Defination', appDefinition);
    const appDef = {
      appId: uuid(),
      createAt: '2023-08-24T11:42:43.379Z',
      definition: appDefinition,
      id: '',
      name: 'v1',
      updatedAt: '2023-08-24T11:42:43.379Z'
    };
    const data = {
      appV2: {
        appEnvironments: [],
        appVersions: [{ ...appDef }],
        createdAt: '',
        currentVersionId: '',
        dataQueries: [],
        dataSourceOptions: [],
        dataSources: [],
        editingVersion: appDef
      },
      formbuilderVersion: '1'
    };

    const json = JSON.stringify(data, null, 2);
    console.log('json', json);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
  };

  console.log('render', rendering);
  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        <Typography.Title level={4}>Canvas</Typography.Title>
        <Button onClick={() => exportApp()}>Export App</Button>
      </div>
      <div className="editor wrapper">
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <div className="sub-section">
            <div className={`main main-editor-canvas `} id="main-editor-canvas">
              <div
                className="canvas-container align-items-center"
                style={{
                  transform: `scale(1.0)`,
                  // borderLeft:
                  //   (this.state.editorMarginLeft
                  //     ? this.state.editorMarginLeft - 1
                  //     : this.state.editorMarginLeft) +
                  //   `px solid ${this.computeCanvasBackgroundColor()}`,
                  height: '80%',
                  background: '#f4f6fa'
                }}
                onMouseUp={e => {
                  // if (["real-canvas", "modal"].includes(e.target.className)) {
                  //   this.setState({
                  //     selectedComponents: [],
                  //     currentSidebarTab: 2,
                  //     hoveredComponent: false,
                  //   });
                  // }
                }}
                ref={canvasContainerRef}
                // onScroll={() => {
                //   selectionRef.current.checkScroll();
                // }}
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
                          // socket={socket}
                          appDefinition={appDefinition}
                          appDefinitionChanged={appDefinitionChanged}
                          snapToGrid={true}
                          // darkMode={this.props.darkMode}
                          mode={'edit'}
                          zoomLevel={zoomLevel}
                          deviceWindowWidth={100}
                          selectedComponents={selectedComponents}
                          // appLoading={isLoading}
                          // onEvent={handleEvent}
                          // onComponentOptionChanged={
                          //   handleOnComponentOptionChanged
                          // }
                          // onComponentOptionsChanged={
                          //   handleOnComponentOptionsChanged
                          // }
                          setSelectedComponent={setSelectedComponent}
                          // handleUndo={handleUndo}
                          // handleRedo={handleRedo}
                          // removeComponent={removeComponent}
                          onComponentClick={handleComponentClick}
                          onComponentHover={handleComponentHover}
                          hoveredComponent={hoveredComponent}
                          // sideBarDebugger={sideBarDebugger}
                          currentPageId={currentPageID}
                        />
                        <CustomDraggerLayer
                          snapToGrid={true}
                          canvasWidth={1090}
                          onDragging={() => {
                            console.log('dragging');
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
