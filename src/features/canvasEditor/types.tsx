import { IWidget } from '../widgetsManager/component';

// type ValueObject = {
//   value: string;
// };

// type DisplayNameWithType = {
//   type: string;
//   displayName: string;
// };

// type DisplayName = {
//   displayName: string;
// };

// type StyleObject = {
//   type: string;
//   displayName: string;
//   validation: {
//     schema: { type: string };
//     defaultValue: boolean;
//   };
// };

export type Size = {
  width: number;
  height: number;
};

export type Layout = {
  [key: string]: {
    top: number;
    height: number;
    left: number;
    width: number;
  };
};

export type ComponentDefinitation = {
  component: IWidget;
  layout: Layout;
  withDefaultChildren: boolean;
};

export type AddNewAppDefination = {
  [key: string]: ComponentDefinitation;
};
export interface IAppDefination {
  showViewerNavigation: boolean;
  homePageId: number;
  pages: {
    [key: string]: {
      components: { [key: string]: ComponentDefinitation };
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

// export interface IWidget {
//   displayName: string;
//   component: string;
//   actions: object[];
//   defaultSize: Size;
//   defaultChildren?: object;
//   definition: {
//     others: {
//       showOnDesktop: ValueObject;
//       showOnMobile: ValueObject;
//     };
//     properties: {
//       text: ValueObject;
//       loadingState: ValueObject;
//     };
//     events: [];
//     styles: {
//       backgroundColor: ValueObject;
//       textColor: ValueObject;
//       loaderColor: ValueObject;
//       visibility: ValueObject;
//       borderRadius: ValueObject;
//       borderColor: ValueObject;
//       disabledState: ValueObject;
//     };
//   };
//   events: {
//     onClick: DisplayName;
//     onHover: DisplayName;
//   };
//   exposedVariables: {
//     buttonText: string;
//   };
//   generalStyles: {
//     boxShadow: DisplayNameWithType;
//   };
//   others: {
//     showOnDesktop: DisplayNameWithType;
//     showOnTab: DisplayNameWithType;
//   };
//   properties: object;
//   styles: {
//     backgroundColor: StyleObject;
//     textColor: StyleObject;
//     loaderColor: StyleObject;
//     visibility: StyleObject;
//     disabledState: StyleObject;
//     borderRadius: StyleObject;
//     borderColor: StyleObject;
//   };
//   validate: boolean;
// }

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
