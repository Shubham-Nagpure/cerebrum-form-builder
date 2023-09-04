import { IWidget } from '../types';

/**
 * Widget of all the configuration of UI Component
 */
export const widgets: IWidget[] = [
  {
    name: 'Button',
    displayName: 'Button',
    description: 'Trigger actions: queries, alerts etc',
    component: 'Button',
    defaultSize: {
      width: 5,
      height: 30
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnTab: { type: 'toggle', displayName: 'Show on Tab' }
    },
    properties: {
      text: {
        type: 'code',
        displayName: 'Button Text',
        validation: {
          schema: { type: 'string' }
        }
      },
      loadingState: {
        type: 'toggle',
        displayName: 'Loading State',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    events: {
      onClick: { displayName: 'On click' },
      onHover: { displayName: 'On hover' }
    },
    styles: {
      backgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      },
      textColor: {
        type: 'color',
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      },
      loaderColor: {
        type: 'color',
        displayName: 'Loader color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false
        }
      },
      borderRadius: {
        type: 'number',
        displayName: 'Border radius',
        validation: {
          schema: { type: 'number' },
          defaultValue: false
        }
      },
      borderColor: {
        type: 'color',
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      }
    },
    exposedVariables: {
      buttonText: 'Button'
    },
    actions: [
      {
        handle: 'click',
        displayName: 'Click'
      },
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'Text', defaultValue: 'New Text' }]
      },
      {
        handle: 'disable',
        displayName: 'Disable',
        params: [
          {
            handle: 'disable',
            displayName: 'Value',
            defaultValue: `{{false}}`,
            type: 'toggle'
          }
        ]
      },
      {
        handle: 'visibility',
        displayName: 'Visibility',
        params: [
          {
            handle: 'visible',
            displayName: 'Value',
            defaultValue: `{{false}}`,
            type: 'toggle'
          }
        ]
      },
      {
        handle: 'loading',
        displayName: 'Loading',
        params: [
          {
            handle: 'loading',
            displayName: 'Value',
            defaultValue: `{{false}}`,
            type: 'toggle'
          }
        ]
      }
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        text: { value: `Button` },
        loadingState: { value: `{{false}}` }
      },
      events: [],
      styles: {
        backgroundColor: { value: '#375FCF' },
        textColor: { value: '#fff' },
        loaderColor: { value: '#fff' },
        visibility: { value: '{{true}}' },
        borderRadius: { value: '{{0}}' },
        borderColor: { value: '#375FCF' },
        disabledState: { value: '{{false}}' }
      }
    }
  },
  {
    name: 'Form',
    displayName: 'Form',
    description: 'Wrapper for multiple components',
    defaultSize: {
      width: 13,
      height: 330
    },
    defaultChildren: [
      {
        componentName: 'Text',
        layout: {
          top: 40,
          left: 10,
          height: 30,
          width: 17
        },
        properties: ['text'],
        styles: ['fontWeight', 'textSize', 'textColor'],
        defaultValue: {
          text: 'User Details',
          fontWeight: 'bold',
          textSize: 20,
          textColor: '#000'
        }
      },
      {
        componentName: 'Text',
        layout: {
          top: 90,
          left: 10,
          height: 30
        },
        properties: ['text'],
        defaultValue: {
          text: 'Name'
        }
      },
      {
        componentName: 'Text',
        layout: {
          top: 160,
          left: 10,
          height: 30
        },
        properties: ['text'],
        defaultValue: {
          text: 'Age'
        }
      },
      {
        componentName: 'TextInput',
        layout: {
          top: 120,
          left: 10,
          height: 30,
          width: 25
        },
        properties: ['placeholder'],
        defaultValue: {
          placeholder: 'Enter your name'
        }
      },
      {
        componentName: 'NumberInput',
        layout: {
          top: 190,
          left: 10,
          height: 30,
          width: 25
        },
        properties: ['value'],
        styles: ['borderColor'],
        defaultValue: {
          value: 24,
          borderColor: '#dadcde'
        }
      },
      {
        componentName: 'Button',
        layout: {
          top: 240,
          left: 10,
          height: 30,
          width: 10
        },
        properties: ['text'],
        defaultValue: {
          text: 'Submit'
        }
      }
    ],
    component: 'Form',
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      buttonToSubmit: {
        type: 'select',
        displayName: 'Button To Submit Form',
        options: [{ name: 'None', value: 'none' }],
        validation: {
          schema: { type: 'string' }
        },
        conditionallyRender: {
          key: 'advanced',
          value: false
        }
      },
      loadingState: {
        type: 'toggle',
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      advanced: {
        type: 'toggle',
        displayName: ' Use custom schema'
      },
      JSONSchema: {
        type: 'code',
        displayName: 'JSON Schema',
        conditionallyRender: {
          key: 'advanced',
          value: true
        }
      }
    },
    events: {
      onSubmit: { displayName: 'On submit' },
      onInvalid: { displayName: 'On invalid' }
    },
    styles: {
      backgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' }
        }
      },
      borderRadius: {
        type: 'code',
        displayName: 'Border Radius',
        validation: {
          schema: {
            type: 'union'
            // schemas: [{ type: 'string' }, { type: 'number' }]
          }
        }
      },
      borderColor: {
        type: 'color',
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' }
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    exposedVariables: {
      data: {},
      isValid: true
    },
    actions: [
      {
        handle: 'submitForm',
        displayName: 'Submit Form'
      },
      {
        handle: 'resetForm',
        displayName: 'Reset Form'
      }
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        loadingState: { value: '{{false}}' },
        advanced: { value: '{{false}}' },
        JSONSchema: {
          value:
            "{{ {title: 'User registration form', properties: {firstname: {type: 'textinput',value: 'Maria',label:'First name', validation:{maxLength:6}, styles: {backgroundColor: '#f6f5ff',textColor: 'black'},},lastname:{type: 'textinput',value: 'Doe', label:'Last name', styles: {backgroundColor: '#f6f5ff',textColor: 'black'},},age:{type:'number'},}, submitButton: {value: 'Submit', styles: {backgroundColor: '#3a433b',borderColor:'#595959'}}} }}"
        }
      },
      events: [],
      styles: {
        backgroundColor: { value: '#fff' },
        borderRadius: { value: '0' },
        borderColor: { value: '#fff' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' }
      }
    }
  }
];
