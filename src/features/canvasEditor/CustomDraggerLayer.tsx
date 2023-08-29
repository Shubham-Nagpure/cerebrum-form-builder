import React, { useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from '../componentManager/ItemTypes';
import { BoxDragPreview } from './BoxDragPreview';
import { shallow } from 'zustand/shallow';
import { useEditorStore } from '../../stores/canvasStore';
const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function snapToGrid(canvasWidth, x, y) {
  const gridX = canvasWidth / 43;

  const snappedX = Math.round(x / gridX) * gridX;
  const snappedY = Math.round(y / 10) * 10;
  return [snappedX, snappedY];
}

function getItemStyles(
  delta,
  item,
  initialOffset,
  currentOffset,
  currentLayout,
  initialClientOffset,
  canvasWidth
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }
  let x, y;

  const id = item.id;
  // const canvasContainerBoundingRect = document.getElementsByClassName('canvas-container')[0].getBoundingClientRect();
  const realCanvasBoundingRect = document
    .getElementsByClassName('real-canvas')[0]
    .getBoundingClientRect();

  // const realCanvasDelta = realCanvasBoundingRect.x - canvasContainerBoundingRect.x;

  if (id) {
    // Dragging within the canvas

    x = Math.round((item.layouts[currentLayout].left * canvasWidth) / 100 + delta.x);
    y = Math.round(item.layouts[currentLayout].top + delta.y);
  } else {
    // New component being dragged  from components sidebar
    const offsetFromTopOfWindow = realCanvasBoundingRect.top;
    const offsetFromLeftOfWindow = realCanvasBoundingRect.left;
    const zoomLevel = item.zoomLevel;

    x = Math.round(
      currentOffset.x + currentOffset.x * (1 - zoomLevel) - offsetFromLeftOfWindow
    );
    y = Math.round(
      initialClientOffset.y -
        10 +
        delta.y +
        currentOffset.y * (1 - zoomLevel) -
        offsetFromTopOfWindow
    );
  }

  [x, y] = snapToGrid(canvasWidth, x, y);

  // commented to fix issue that caused the dragged element to be out of position with mouse pointer
  // x += realCanvasDelta;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    width: 'fit-content'
  };
}

export const CustomDraggerLayer = ({ canvasWidth, onDragging }) => {
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

  const { currentLayout } = useEditorStore(
    state => ({
      currentLayout: state?.currentLayout
    }),
    shallow
  );

  useEffect(() => {
    onDragging(isDragging);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  if (itemType === ItemTypes.COMMENT) return null;
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
