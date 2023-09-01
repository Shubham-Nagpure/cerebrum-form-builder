import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Rnd } from 'react-rnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from './ItemTypes';
import Box from './Box';
import { IWidget } from '../types';
import { Layout } from '../types';

const getStyles = (
  isDragging: boolean,
  isSelectedComponent: boolean | undefined
): React.CSSProperties => {
  // console.log('isDragging', isDragging, isSelectedComponent);
  return {
    position: 'absolute',
    zIndex: isSelectedComponent ? 2 : 1,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1
  };
};

declare type ResizeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

declare type ResizableDelta = {
  width: number;
  height: number;
};

declare type Position = {
  x: number;
  y: number;
};

type Props = {
  key?: number;
  index: number;
  component: IWidget;
  id?: number | string;
  title?: string;
  parent?: string;
  layouts?: Layout;
  canvasWidth?: number;
  inCanvas?: boolean;
  isSelectedComponent?: boolean;
  mode?: string;
  draggingStatusChanged?: (value: boolean) => void;
  hoveredComponent?: object;
  setSelectedComponents?: (id: number | string, component: IWidget) => void;
  onDragStop?: () => void;
  onComponentClick?: () => void;
  allComponents?: [];
  onResizeStop?: (
    id: number | string,
    e: MouseEvent | TouchEvent,
    dir: ResizeDirection,
    elementRef: HTMLElement,
    delta: ResizableDelta,
    position: Position
  ) => void;
  zoomLevel: number;
  childComponents?: object | null;
  parentId?: number;
};

export const DraggableBox = ({
  index,
  component,
  id,
  title,
  parent,
  layouts,
  canvasWidth,
  inCanvas,
  isSelectedComponent,
  draggingStatusChanged,
  setSelectedComponents,
  onResizeStop,
  zoomLevel
}: Props) => {
  const [isResizing, setResizing] = useState(false);
  const [isDragging2, setDragging] = useState(false);

  const currentLayout = 'desktop';
  useEffect(() => {
    if (draggingStatusChanged) {
      draggingStatusChanged(isDragging2);
    }

    if (isDragging2 && !isSelectedComponent && id && setSelectedComponents) {
      setSelectedComponents(id, component);
    }
  }, [
    isDragging2,
    draggingStatusChanged,
    isSelectedComponent,
    id,
    component,
    setSelectedComponents
  ]);

  const defaultData = {
    top: 100,
    left: 0,
    width: 445,
    height: 500
  };
  const NO_OF_GRIDS = 43;
  console.log(layouts);
  const layoutData = inCanvas
    ? layouts?.[currentLayout] || defaultData
    : defaultData;

  const gridWidth = canvasWidth ? canvasWidth / NO_OF_GRIDS : 0;
  const width = ((canvasWidth || 0) * (layoutData?.width || 0)) / NO_OF_GRIDS;

  const style = {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px'
  };

  const resizerClasses = {
    topRight: 'top-right',
    bottomRight: 'bottom-right',
    bottomLeft: 'bottom-left',
    topLeft: 'top-left'
  };

  const resizerStyles = {
    topRight: {
      width: '8px',
      height: '8px',
      right: '-4px',
      top: '-4px'
    },
    bottomRight: {
      width: '8px',
      height: '8px',
      right: '-4px',
      bottom: '-4px'
    },
    bottomLeft: {
      width: '8px',
      height: '8px',
      left: '-4px',
      bottom: '-4px'
    },
    topLeft: {
      width: '8px',
      height: '8px',
      left: '-4px',
      top: '-4px'
    }
  };

  // useDrag hook from rnd
  const [{ isDragging }, drag, preview] = useDrag(() => {
    return {
      type: ItemTypes.BOX,
      item: {
        id,
        title,
        component,
        parent,
        layouts,
        canvasWidth,
        currentLayout,
        zoomLevel
      },
      collect: moniter => {
        return {
          isDragging: moniter.isDragging()
        };
      }
    };
  }, [
    id,
    title,
    component,
    index,
    parent,
    layouts,
    canvasWidth,
    currentLayout,
    zoomLevel
  ]);

  // let _refProps = {};

  // if (mode === 'edit' && canDrag) {
  //   _refProps = {
  //     ref: drag
  //   };
  // }

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [isDragging, preview]);

  // const changeCanDrag = newState => {
  //   setCanDrag(newState);
  // };

  // const style2 = {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   border: 'solid 1px #ddd',
  //   background: '#f0f0f0',
  //   top: '90px',
  //   left: '10px'
  // };

  function computeWidth(currentLayoutOptions: { height: 0; width: 0 }) {
    return `${currentLayoutOptions?.width}%`;
  }

  return (
    <div
      className={
        inCanvas
          ? ''
          : 'text-center align-items-center clearfix mb-2 col-md-4 d-flex'
      }
      style={!inCanvas ? {} : { width: computeWidth({ height: 0, width: 0 }) }}
    >
      {inCanvas ? (
        <div
          onMouseEnter={() => console.log('mouse eneter in dragrabble box')}
          onMouseLeave={() => console.log('mouseLeave')}
          style={getStyles(isDragging, isSelectedComponent) as React.CSSProperties}
        >
          <Rnd
            style={{ ...style }}
            resizeGrid={[gridWidth, 10]}
            dragGrid={[gridWidth, 10]}
            size={{
              width: width,
              height: layoutData?.height || 0
            }}
            position={{
              x: layoutData ? (layoutData.left * (canvasWidth || 0)) / 100 : 0,
              y: layoutData ? layoutData.top : 0
            }}
            defaultSize={{}}
            className={`resizer ${
              isResizing || isDragging2 || isSelectedComponent
                ? 'resizer-active'
                : ''
            } `}
            onResize={() => setResizing(true)}
            onDrag={e => {
              e.preventDefault();
              e.stopPropagation();
              // e.stopImmediatePropagation();
              if (!isDragging2) {
                setDragging(true);
              }
            }}
            resizeHandleClasses={isSelectedComponent ? resizerClasses : {}}
            resizeHandleStyles={resizerStyles}
            // enableResizing={mode === 'edit' && !readOnly}
            // disableDragging={mode !== 'edit' || readOnly}
            onDragStop={() => {
              setDragging(false);
              // onDragStop(e, id, direction, currentLayout, layoutData);
            }}
            onResizeStop={(e, direction, ref, d, position) => {
              setResizing(false);
              if (onResizeStop && id)
                onResizeStop(id, e, direction, ref, d, position);
            }}
            bounds={parent !== undefined ? `#canvas-${parent}` : '.real-canvas'}
            cancel={`div.table-responsive.jet-data-table, div.calendar-widget, div.text-input, .textarea, .map-widget, .range-slider, .kanban-container, div.real-canvas`}
            widgetId={id}
          >
            <div
              ref={preview}
              role="DraggableBox"
              style={isResizing ? { opacity: 0.5 } : { opacity: 1 }}
            >
              <Box component={component} inCanvas={inCanvas} />
            </div>
          </Rnd>
        </div>
      ) : (
        <>
          <div
            ref={drag}
            role="DraggableBox"
            className="draggable-box"
            style={{ height: '100%' }}
          >
            <Box component={component} inCanvas={inCanvas} />
          </div>
        </>
      )}
    </div>
  );
};
