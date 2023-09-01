/**Universal Interface */

interface IGeneral {
  tooltip: IPropertiesInterface;
}

export interface IEvent {
  [key: string]: { displayName: string };
}

export interface IUniversalProps {
  properties: Record<string, IPropertiesInterface>;
  general: IGeneral;
  others: Record<string, { type: string; displayName: string }>;
  events: IEvent;
  styles: Record<string, IPropertiesInterface>;
  validate: boolean;
  generalStyles: {
    boxShadow: { type: string; displayName: string };
  };
  definition: {
    others: Record<string, IValues>;
    events: [];
    styles: Record<string, IValues>;
    generalStyles: Record<string, IValues>;
  };
}

export interface IDefinition {
  others: Record<string, IValues>;
  events: [];
  styles: Record<string, IValues>;
  generalStyles: Record<string, IValues>;
}

/**Widgets Interface */
interface IValidationSchema {
  schema: Record<string, string>;
  defaultValue?: boolean;
}

interface IOptions {
  name: string;
  value: string;
}

interface IPropertiesInterface {
  type: string;
  displayName: string;
  validation?: IValidationSchema;
  options?: IOptions[];
  conditionallyRender?: {
    key: string;
    value: boolean;
  };
}

interface IParmas {
  handle: string;
  displayName: string;
  defaultValue: string;
  type?: string;
}

interface IValues {
  value: string;
}

interface ILayout {
  top?: number;
  left?: number;
  height?: number;
  width?: number;
}
interface IChildren {
  componentName: string;
  layout: ILayout;
  properties: string[];
  defaultValue: Record<string, string | number>;
  styles?: string[];
}

export interface IWidget {
  name: string;
  displayName: string;
  description: string;
  component: string;
  defaultSize: { width: number; height: number };
  others?: Record<string, { type: string; displayName: string }>;
  properties?: Record<string, IPropertiesInterface>;
  events?: IEvent;
  styles: Record<string, IPropertiesInterface>;
  exposedVariables: Record<string, object | boolean | string>;
  actions: {
    handle: string;
    displayName: string;
    params?: IParmas[];
  }[];
  definition: {
    others: Record<string, IValues>;
    properties: Record<string, IValues>;
    events: [];
    styles: Record<string, IValues>;
  };
  defaultChildren?: IChildren[];
}

/**Neeed to reused */

export type Size = {
  width: number;
  height: number;
};

export type Layout = {
  [key: string | number]: {
    top: number;
    height?: number;
    left: number;
    width?: number;
  };
};

export type ComponentDefinitation = {
  component: IWidget;
  layout: Layout;
  withDefaultChildren: boolean;
};

export type AddNewAppDefination = {
  [key: string]:
    | ComponentDefinitation
    | {
        component: IWidget;
        layouts: {
          [x: number]: {
            top: number;
            left: number;
          };
        };
      };
};

// {
//   pages: {
//     [x: number]: {
//       components: {
//         [key: string]: ComponentDefinitation;
//       };
//       handle: string;
//       name: string;
//     } | {
//       components: AddNewAppDefination;
//       handle: string;
//       name: string;
//     };
//   };
//   showViewerNavigation: boolean;
//   homePageId: number;

// }
export interface IAppDefination {
  showViewerNavigation: boolean;
  homePageId: number;
  pages: {
    [x: number]: {
      components:
        | { [key: string]: ComponentDefinitation }
        | {
            components: AddNewAppDefination;
            handle: string;
            name: string;
          };
      handle: string;
      name: string;
    };
  };
  globalSettings: {
    hideHeader: boolean;
    appInMaintenance: boolean;
    canvasMaxWidth: number;
    canvasMaxWidthType: string;
    canvasMaxHeight: string;
    canvasBackgroundColor: string;
    backgroundFxQuery: string;
  };
}

export interface IWidgetItem {
  canvasWidth: number;
  currentLayout: string;
  id: string;
  layouts: Layout;
  parent: string;
  title: string;
  zoomLevel: number;
  component: IWidget;
}
