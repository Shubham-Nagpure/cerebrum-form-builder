import { memo } from 'react';
import { IWidgetItem, Size } from './types';

type Props = {
  item: IWidgetItem;
  canvasWidth: number;
};

export const BoxDragPreview = memo(({ item, canvasWidth }: Props) => {
  const layouts = item.layouts;
  let { width, height }: Size = item.component.defaultSize;

  if (layouts) {
    width = 100;
    height = 100;
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
