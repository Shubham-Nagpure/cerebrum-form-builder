import React, { memo, useState, useEffect } from 'react';

export const BoxDragPreview = memo(({ item, canvasWidth }) => {
  const [tickTock, setTickTock] = useState(false);
  useEffect(
    function subscribeToIntervalTick() {
      const interval = setInterval(() => setTickTock(!tickTock), 500);
      return () => clearInterval(interval);
    },
    [tickTock]
  );

  const layouts = item.layouts;
  let { width, height } = layouts ? 100 : {};

  if (item.id === undefined) {
    width = item.component.defaultSize.width;
    height = item.component.defaultSize.height;
  }
  return (
    <div
      className="resizer-active draggable-box"
      style={{
        height,
        width: (width * canvasWidth) / 43,
        border: 'solid 1px rgb(70, 165, 253)',
        padding: '2px'
      }}
    >
      <div
        style={{
          background: '#438fd7',
          opacity: '0.7',
          height: '100%',
          width: '100%'
        }}
      ></div>
    </div>
  );
});
