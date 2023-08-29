import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDrop, useDragLayer } from 'react-dnd';
import { DraggableBox } from '../componentManager/DraggableBox';
import { useEditorStore } from '../../stores/canvasStore';
import { shallow } from 'zustand/shallow';
import { ItemTypes } from '../componentManager/ItemTypes';

const NO_OF_GRIDS = 43;
const CanvasContainer = ({
  canvasWidth,
  mode,
  snapToGrid,
  onComponentClick,
  onEvent,
  appDefinition,
  appDefinitionChanged,
  onComponentOptionChanged,
  onComponentOptionsChanged,
  appLoading,
  setSelectedComponent,
  zoomLevel,
  removeComponent,
  deviceWindowWidth,
  selectedComponents,
  darkMode,
  socket,
  handleUndo,
  handleRedo,
  onComponentHover,
  hoveredComponent,
  sideBarDebugger,
  currentPageId
}) => {
  const { currentLayout } = useEditorStore(
    state => ({
      currentLayout: state?.currentLayout
    }),
    shallow
  );

  const gridWidth = canvasWidth / NO_OF_GRIDS;
  const styles = {
    width: '100%',
    maxWidth: `${canvasWidth}px`,
    backgroundSize: `${gridWidth}px 10px`
  };

  const components = appDefinition.pages[currentPageId]?.components ?? {};

  const [commentsPreviewList, setCommentsPreviewList] = useState([]);
  const [boxes, setBoxes] = useState(components);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [newThread, addNewThread] = useState({});
  const [isContainerFocused, setContainerFocus] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(null);
  // const router = useRouter();
  const canvasRef = useRef(null);
  const focusedParentIdRef = useRef(undefined);

  useEffect(() => {
    const handleClick = e => {
      console.log('handle click');
      if (
        canvasRef.current.contains(e.target) ||
        document.getElementById('modal-container')?.contains(e.target)
      ) {
        const elem = e.target.closest('.real-canvas').getAttribute('id');
        if (elem === 'real-canvas') {
          focusedParentIdRef.current = undefined;
        } else {
          const parentId = elem.split('canvas-')[1];
          focusedParentIdRef.current = parentId;
        }
        if (!isContainerFocused) {
          setContainerFocus(true);
        }
      } else if (isContainerFocused) {
        setContainerFocus(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isContainerFocused, canvasRef]);

  useEffect(() => {
    setBoxes(components);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(components)]);

  //   function updateCanvasHeight(components) {
  //     const maxHeight = Object.values(components).reduce((max, component) => {
  //       //   const layout = component?.layouts?.[currentLayout];
  //       //   if (!layout) {
  //       //     return max;
  //       //   }
  //       const sum = layout.top + layout.height;
  //       return Math.max(max, sum);
  //     }, 0);

  //     const bottomPadding = mode === "view" ? 100 : 300;
  //     const frameHeight =
  //       mode === "view"
  //         ? appDefinition.globalSettings?.hideHeader
  //           ? 0
  //           : 45
  //         : 85;

  //     setCanvasHeight(
  //       `max(100vh - ${frameHeight}px, ${maxHeight + bottomPadding}px)`
  //     );
  //   }

  //listening to no of component change to handle addition/deletion of widgets
  const noOfBoxs = Object.values(boxes || []).length;
  //   useEffect(() => {
  //     updateCanvasHeight(boxes);
  //   }, [noOfBoxs]);

  const { draggingState } = useDragLayer(monitor => {
    if (monitor.isDragging()) {
      console.log('monitor.getItme', monitor.getItem());
      if (!monitor.getItem().parent) {
        return { draggingState: true };
      } else {
        return { draggingState: false };
      }
    } else {
      return { draggingState: false };
    }
  });
  useEffect(() => {
    setIsDragging(draggingState);
  }, [draggingState]);

  const handleAddThread = async e => {
    e.stopPropogation && e.stopPropogation();

    const x = (e.nativeEvent.offsetX * 100) / canvasWidth;

    const elementIndex = commentsPreviewList.length;
    setCommentsPreviewList([
      ...commentsPreviewList,
      {
        x: x,
        y: e.nativeEvent.offsetY
      }
    ]);

    // const { data } = await commentsService.createThread({
    //   appId: router.query.id,
    //   x: x,
    //   y: e.nativeEvent.offsetY,
    //   appVersionsId,
    //   pageId: currentPageId,
    // });

    // Remove the temporary loader preview
    const _commentsPreviewList = [...commentsPreviewList];
    _commentsPreviewList.splice(elementIndex, 1);
    setCommentsPreviewList(_commentsPreviewList);

    // Update the threads on all connected clients using websocket
    // socket.send(
    //   JSON.stringify({
    //     event: "events",
    //     data: { message: "threads", appId: router.query.id },
    //   })
    // );

    // Update the list of threads on the current users page
    // addNewThread(data);
  };

  console.log('appDefination', appDefinition);
  const moveBox = useCallback(
    (id, layouts) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { layouts }
          }
        })
      );
    },
    [boxes]
  );

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const newDefinition = {
      ...appDefinition,
      pages: {
        ...appDefinition.pages,
        [currentPageId]: {
          ...appDefinition.pages[currentPageId],
          components: boxes
        }
      }
    };

    appDefinitionChanged(newDefinition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxes]);

  function convertXToPercentage(x, canvasWidth) {
    return (x * 100) / canvasWidth;
  }

  React.useEffect(() => {}, [selectedComponents]);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX, ItemTypes.COMMENT],
      async drop(item, monitor) {
        if (item.parent) {
          return;
        }

        if (item.name === 'comment') {
          const canvasBoundingRect = document
            .getElementsByClassName('real-canvas')[0]
            .getBoundingClientRect();
          console.log('canmp', canvasBoundingRect);
          const offsetFromTopOfWindow = canvasBoundingRect.top;
          const offsetFromLeftOfWindow = canvasBoundingRect.left;
          const currentOffset = monitor.getSourceClientOffset();

          const xOffset = Math.round(
            currentOffset.x +
              currentOffset.x * (1 - zoomLevel) -
              offsetFromLeftOfWindow
          );
          const y = Math.round(
            currentOffset.y +
              currentOffset.y * (1 - zoomLevel) -
              offsetFromTopOfWindow
          );

          const x = (xOffset * 100) / canvasWidth;

          const element = document.getElementById(`thread-${item.threadId}`);
          element.style.transform = `translate(${xOffset}px, ${y}px)`;
          //   commentsService.updateThread(item.threadId, { x, y });
          return undefined;
        }

        const canvasBoundingRect = document
          .getElementsByClassName('real-canvas')[0]
          .getBoundingClientRect();
        console.log('canmp', canvasBoundingRect);

        const componentMeta = componentTypes.find(
          component => component.component === item.component.component
        );
        const newComponent = addNewWidgetToTheEditor(
          componentMeta,
          monitor,
          boxes,
          canvasBoundingRect,
          item.currentLayout,
          snapToGrid,
          zoomLevel
        );
        const newBoxes = {
          ...boxes,
          [newComponent.id]: {
            component: newComponent.component,
            layouts: {
              ...newComponent.layout
            },
            withDefaultChildren: newComponent.withDefaultChildren
          }
        };

        setBoxes(newBoxes);

        setSelectedComponent(newComponent.id, newComponent.component);

        return undefined;
      },
      collect: monitor => {
        return {
          isOver: !!monitor.isOver()
        };
      }
    }),
    [moveBox]
  );

  console.log('box', boxes);
  return (
    <div
      ref={el => {
        canvasRef.current = el;
        drop(el);
      }}
      // ref={drop}
      style={{ ...styles, height: '100%' }}
      // className={cx('real-canvas', {
      //   'show-grid': isDragging || isResizing
      // })}
      className={`real-canvas ${(isDragging || isResizing) && 'show-grid'}`}
      // className="real-canvas show-grid"
      id="real-canvas"
      data-cy="real-canvas"
      // canvas-height={canvasHeight}
    >
      {Object.keys(boxes).map(key => {
        const box = boxes[key];
        // const canShowInCurrentLayout =
        //   box.component.definition.others[
        //     "currentLayout" === "mobile" ? "showOnMobile" : "showOnDesktop"
        //   ].value;
        const addDefaultChildren = box.withDefaultChildren;
        if (
          !box.parent &&
          true
          //   resolveReferences(canShowInCurrentLayout, currentState)
        ) {
          return (
            <DraggableBox
              canvasWidth={1090}
              onEvent={onEvent}
              onComponentOptionChanged={onComponentOptionChanged}
              onComponentOptionsChanged={onComponentOptionsChanged}
              key={key}
              onResizeStop={() => console.log('Resize Func')}
              onDragStop={() => console.log('onDragStop')}
              paramUpdated={() => console.log('paramUpdated')}
              id={key}
              {...boxes[key]}
              mode={mode}
              resizingStatusChanged={status => setIsResizing(status)}
              draggingStatusChanged={status => setIsDragging(status)}
              inCanvas={true}
              zoomLevel={zoomLevel}
              setSelectedComponent={setSelectedComponent}
              removeComponent={removeComponent}
              deviceWindowWidth={deviceWindowWidth}
              isSelectedComponent={
                mode === 'edit'
                  ? selectedComponents.find(component => component.id === key)
                  : false
              }
              darkMode={darkMode}
              onComponentHover={onComponentHover}
              hoveredComponent={hoveredComponent}
              sideBarDebugger={sideBarDebugger}
              isMultipleComponentsSelected={
                selectedComponents?.length > 1 ? true : false
              }
              //   childComponents={childComponents[key]}
              containerProps={{
                mode,
                snapToGrid,
                onComponentClick,
                onEvent,
                appDefinition,
                appDefinitionChanged,
                // currentState,
                onComponentOptionChanged,
                onComponentOptionsChanged,
                appLoading,
                zoomLevel,
                setSelectedComponent,
                removeComponent,
                currentLayout,
                deviceWindowWidth,
                selectedComponents,
                darkMode,
                onComponentHover,
                hoveredComponent,
                sideBarDebugger,
                addDefaultChildren,
                currentPageId
                // childComponents,
              }}
            />
          );
        }
      })}
      {Object.keys(boxes).length === 0 && !appLoading && !isDragging && (
        <div style={{ paddingTop: '10%' }}>
          <div className="mx-auto w-50 p-5 bg-light no-components-box">
            <center className="text-muted">
              You haven&apos;t added any components yet. Drag components from the
              right sidebar and drop here. Check out our&nbsp;
              <a
                href="https://docs.tooljet.com/docs#the-very-quick-quickstart"
                target="_blank"
                rel="noreferrer"
              >
                guide
              </a>{' '}
              on adding components.
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasContainer;
