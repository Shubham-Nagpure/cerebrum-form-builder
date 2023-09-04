import { useState, useRef, useEffect, useCallback } from 'react';
import { useDrop, useDragLayer } from 'react-dnd';
import { DraggableBox } from '../componentManager/DraggableBox';
import { ItemTypes } from '../componentManager/ItemTypes';
import { componentTypes } from '../widgetsManager/component';
import { addNewWidgetToTheEditor } from '../../helpers/appUtils';
import update from 'immutability-helper';
import { IAppDefination, IWidgetItem, AddNewAppDefination, Layout } from '../types';

const NO_OF_GRIDS = 43;

type Props = {
  canvasWidth: number;
  mode: string;
  snapToGrid: boolean;
  zoomLevel: number;
  deviceWindowWidth: number;
  appDefinition: IAppDefination;
  appDefinitionChanged: (newDefinition: IAppDefination) => void;
  currentPageId: string;
  // onComponentOptionChanged: () => void;
  // onComponentOptionsChanged: () => void;
  // appLoading: boolean;
  // onComponentClick: () => void;
  // onEvent: () => void;
  // setSelectedComponents: (id: string | number, component: IWidget) => void;
  // removeComponent: () => void;
  // selectedComponents: [];
  // darkMode: boolean;
  // onComponentHover: () => void;
  // hoveredComponent: () => void;
};

/**
 * CanvasContainer
 *
 * Description - return the empty canvas of no component is been drag
 * else lis of draggable component
 */
const CanvasContainer = ({
  canvasWidth,
  mode,
  snapToGrid,
  appDefinition,
  appDefinitionChanged,
  // appLoading,
  // setSelectedComponents,
  zoomLevel,
  // selectedComponents,
  currentPageId
}: Props) => {
  // const currentLayout = 'desktop';

  const components = appDefinition.pages[currentPageId]?.components ?? {};
  const [boxes, setBoxes] = useState<AddNewAppDefination>(components);
  const [isDragging, setIsDragging] = useState(false);
  const gridWidth = canvasWidth / NO_OF_GRIDS;
  const styles = {
    width: '100%',
    maxWidth: `${canvasWidth}px`,
    backgroundSize: `${gridWidth}px 10px`
  };

  useEffect(() => {
    console.log('componenets', components);
    setBoxes(components);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(components)]);

  /**
   * This is hook which set the Draggable state of the component
   */
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

  /**
   * set call appDefinitionChanged function when boxes value is update
   */
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

  /**
   * This Funtion set the boxes value when new component is been drag
   *
   */
  const moveBox = useCallback(
    (id: string, layouts: Layout) => {
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

  /**
   * This is hook which define the drop target which get the component
   * that has been drag and set box variable
   */
  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX],
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

        if (componentMeta) {
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
              withDefaultChildren: false
            }
          };
          setBoxes(newBoxes);
        }
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
                // setSelectedComponents={setSelectedComponents}
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
        {Object.keys(boxes).length === 0 && false && !isDragging && (
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
