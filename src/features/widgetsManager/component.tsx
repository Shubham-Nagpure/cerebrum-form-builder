import { widgets } from './WidgetsConfig';
import { IUniversalProps, IWidget } from '../types';

/**
 * This is object contain universal props for component
 */
const universalProps: IUniversalProps = {
  properties: {},
  general: {
    tooltip: {
      type: 'code',
      displayName: 'Tooltip',
      validation: { schema: { type: 'string' } }
    }
  },
  others: {},
  events: {},
  styles: {},
  validate: true,
  generalStyles: {
    boxShadow: { type: 'boxShadow', displayName: 'Box Shadow' }
  },
  definition: {
    others: {},
    events: [],
    styles: {},
    generalStyles: {
      boxShadow: { value: '0px 0px 0px 0px #00000040' }
    }
  }
};

const combineProperties = (widget: IWidget, universal: IUniversalProps) => {
  return {
    ...universal,
    ...widget,
    properties: { ...universal.properties, ...widget.properties },
    general: { ...universal.general },
    others: { ...universal.others, ...widget.others },
    events:
      Array.isArray(universal.events) || Array.isArray(widget.events)
        ? []
        : { ...universal.events, ...widget.events },
    styles: { ...universal.styles, ...widget.styles },
    generalStyles: { ...universal.generalStyles },
    exposedVariables: {
      ...widget.exposedVariables
    }
  };
};

/**
 * This variable return the combination of universal and by default properties of widget
 */
export const componentTypes = widgets.map((widget: IWidget) => {
  return {
    ...combineProperties(widget, universalProps)
    //  definition: combineProperties(widget.definition, universalProps.definition)
  };
});
