import React, { useState, useRef, useEffect } from 'react';
import { useDrop, useDragLayer } from 'react-dnd';
import { DraggableBox } from '../componentManager/DraggableBox';
import { ItemTypes } from '../componentManager/ItemTypes';
import { componentTypes } from '../widgetsManager/component';
import { addNewWidgetToTheEditor } from '../../helpers/appUtils';
import { IAppDefination, IWidgetItem, AddNewAppDefination } from '../types';

const NO_OF_GRIDS = 43;

type Props = {
  canvasWidth: number;
  mode: string;
  snapToGrid: boolean;
  onComponentClick: () => void;
  onEvent: () => void;
  appDefinition: IAppDefination;
  appDefinitionChanged: (newDefinition: IAppDefination) => void;
  onComponentOptionChanged: () => void;
  onComponentOptionsChanged: () => void;
  appLoading: boolean;
  setSelectedComponent: () => void;
  zoomLevel: number;
  removeComponent: () => void;
  deviceWindowWidth: number;
  selectedComponents: [];
  darkMode: boolean;
  onComponentHover: () => void;
  hoveredComponent: () => void;
  currentPageId: number;
};
const CanvasContainer = ({
  canvasWidth,
  mode,
  snapToGrid,
  appDefinition,
  appDefinitionChanged,
  appLoading,
  setSelectedComponent,
  zoomLevel,
  selectedComponents,
  currentPageId
}: Props) => {
  // const currentLayout = 'desktop';

  const gridWidth = canvasWidth / NO_OF_GRIDS;
  const styles = {
    width: '100%',
    maxWidth: `${canvasWidth}px`,
    backgroundSize: `${gridWidth}px 10px`
  };

  const components = appDefinition.pages[currentPageId]?.components ?? {};

  const [boxes, setBoxes] = useState<AddNewAppDefination>(components);
  const [isDragging, setIsDragging] = useState(false);
  // const [isResizing, setIsResizing] = useState(false);
  // const canvasRef = useRef({ current: null });

  useEffect(() => {
    setBoxes(components);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(components)]);

  const { draggingState } = useDragLayer(monitor => {
    if (monitor.isDragging()) {
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

  React.useEffect(() => {}, [selectedComponents]);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX, ItemTypes.COMMENT],
      async drop(item: IWidgetItem, monitor) {
        if (item.parent) {
          return;
        }

        const canvasBoundingRect = document
          .getElementsByClassName('real-canvas')[0]
          .getBoundingClientRect();

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
            }
          }
        };

        setBoxes(newBoxes);
        return undefined;
      },
      collect: monitor => {
        return {
          isOver: !!monitor.isOver()
        };
      }
    }),
    []
  );

  return (
    <>
      <div
        ref={el => {
          // canvasRef.current = el;
          drop(el);
        }}
        style={{ ...styles, height: '100%' }}
        className={`real-canvas ${(isDragging || true) && 'show-grid'}`}
        id="real-canvas"
        data-cy="real-canvas"
      >
        {Object.keys(boxes).map((key, index) => {
          // const box = boxes[key];
          // if(!box.parent)
          const isBox = true;
          if (isBox) {
            return (
              <DraggableBox
                canvasWidth={1090}
                onResizeStop={() => console.log('Resize Func')}
                onDragStop={() => console.log('onDragStop')}
                id={key}
                index={index}
                {...boxes[key]}
                mode={mode}
                inCanvas={true}
                zoomLevel={zoomLevel}
                setSelectedComponent={setSelectedComponent}
                isSelectedComponent={false}
                // containerProps={{
                //   mode,
                //   snapToGrid,
                //   onComponentClick,
                //   onEvent,
                //   appDefinition,
                //   appDefinitionChanged,
                //   // currentState,
                //   onComponentOptionChanged,
                //   onComponentOptionsChanged,
                //   appLoading,
                //   zoomLevel,
                //   setSelectedComponent,
                //   removeComponent,
                //   currentLayout,
                //   deviceWindowWidth,
                //   selectedComponents,
                //   darkMode,
                //   onComponentHover,
                //   hoveredComponent,
                //   addDefaultChildren,
                //   currentPageId
                //   // childComponents,
                // }}
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
    </>
  );
};

export default CanvasContainer;
