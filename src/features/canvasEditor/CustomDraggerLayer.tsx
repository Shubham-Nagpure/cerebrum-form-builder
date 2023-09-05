import React, { useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from '../componentManager/ItemTypes';
import { BoxDragPreview } from './BoxDragPreview';
import { IWidgetItem } from '../types';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

interface XYCoord {
  x: number;
  y: number;
}

interface XYCoordWithNull {
  x: number | null;
  y: number | null;
}

function snapToGrid(canvasWidth: number, x: number, y: number) {
  const gridX = canvasWidth / 43;

  const snappedX = Math.round(x / gridX) * gridX;
  const snappedY = Math.round(y / 10) * 10;
  return [snappedX, snappedY];
}

/**
 * This function return the object of transform properties of the component based on
 * css properties of drag component
 * @param delta
 * @param item
 * @param initialOffset
 * @param currentOffset
 * @param currentLayout
 * @param initialClientOffset
 * @param canvasWidth
 * @returns Object of transform style properties
 */
const getItemStyles = (
  delta: XYCoord | null | undefined,
  item: IWidgetItem,
  initialOffset: XYCoordWithNull | null,
  currentOffset: XYCoordWithNull | null,
  currentLayout: string,
  initialClientOffset: XYCoordWithNull | null,
  canvasWidth: number
): React.CSSProperties => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }
  let x, y;

  const id = item.id;
  const realCanvasBoundingRect = document
    .getElementsByClassName('real-canvas')[0]
    .getBoundingClientRect();

  /**
   * If id - undefined then new component is been drag
   * else component is been drag within the canvas
   */
  if (id) {
    // Component is drag within the canvas
    x = Math.round(
      (item.layouts[currentLayout].left * canvasWidth) / 100 + (delta?.x || 0)
    );
    y = Math.round(item.layouts[currentLayout].top + (delta?.y || 0));
  } else {
    // New component is been drag
    const offsetFromTopOfWindow = realCanvasBoundingRect.top;
    const offsetFromLeftOfWindow = realCanvasBoundingRect.left;
    const zoomLevel = item.zoomLevel || 1;

    x = Math.round(
      (currentOffset?.x || 0) +
        (currentOffset?.x || 0) * (1 - zoomLevel) -
        offsetFromLeftOfWindow
    );
    y = Math.round(
      (initialClientOffset?.y || 0) -
        10 +
        (delta?.y || 0 || 0) +
        (currentOffset?.y || 0) * (1 - zoomLevel) -
        offsetFromTopOfWindow
    );
  }

  [x, y] = snapToGrid(canvasWidth, x, y);

  /**
   * This variable containe the translate function which define the
   * moving and reposition of the element along with X and Y axes
   */
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    width: 'fit-content'
  };
};

/**
 *
 * @param param0
 * @returns JSX of Draggable preview of the component that need to drag
 */
export const CustomDraggerLayer = ({
  canvasWidth,
  onDragging
}: {
  canvasWidth: number;
  onDragging: (isDragging: boolean) => void;
}) => {
  /**
   * This is useDragLayer hook which recive moniter paramter
   * which return the CSS properties of position of draggable layer
   */
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
    delta,
    initialClientOffset
  } = useDragLayer(monitor => {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      initialClientOffset: monitor.getInitialClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      delta: monitor.getDifferenceFromInitialOffset()
    };
  });

  const currentLayout = 'desktop';

  useEffect(() => {
    onDragging(isDragging);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  /**
   *
   * @returns JSX function which return BoxDragPreview
   */
  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview item={item} canvasWidth={canvasWidth} />;
      default:
        return null;
    }
  }

  if (!isDragging || !item || item.parent) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          delta,
          item,
          initialOffset,
          currentOffset,
          currentLayout,
          initialClientOffset,
          canvasWidth
        )}
      >
        {renderItem()}
      </div>
    </div>
  );
};
