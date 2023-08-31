import { IWidget } from './component';

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
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
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
    name: 'Card',
    displayName: 'Card',
    description: 'Display Details',
    component: 'Card',
    defaultSize: {
      width: 10,
      height: 300
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      text: {
        type: 'code',
        displayName: 'Card Name',
        validation: {
          schema: { type: 'string' }
        }
      }
      // loadingState: {
      //   type: "toggle",
      //   displayName: "Loading State",
      //   validation: {
      //     schema: { type: "boolean" },
      //   },
      // },
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
      buttonText: 'Card'
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
    name: 'Table',
    displayName: 'Table',
    description: 'Display paginated tabular data',
    component: 'Table',
    properties: {
      title: {
        type: 'string',
        displayName: 'Title',
        validation: {
          schema: { type: 'string' }
        }
      },
      data: {
        type: 'code',
        displayName: 'Table data',
        validation: {
          schema: {
            type: 'array',
            element: { type: 'object' },
            optional: true
          }
        }
      },
      loadingState: {
        type: 'toggle',
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      columns: {
        type: 'array',
        displayName: 'Table Columns'
      },
      useDynamicColumn: {
        type: 'toggle',
        displayName: 'Use dynamic column',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      columnData: {
        type: 'code',
        displayName: 'Column data'
      },
      rowsPerPage: {
        type: 'code',
        displayName: 'Number of rows per page',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }]
          }
        }
      },
      serverSidePagination: {
        type: 'toggle',
        displayName: 'Server-side pagination',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      enableNextButton: {
        type: 'toggle',
        displayName: 'Enable next page button',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      enabledSort: {
        type: 'toggle',
        displayName: 'Enable sorting',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      hideColumnSelectorButton: {
        type: 'toggle',
        displayName: 'Hide column selector button',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      enablePrevButton: {
        type: 'toggle',
        displayName: 'Enable previous page button',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      totalRecords: {
        type: 'code',
        displayName: 'Total records server side',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }]
          }
        }
      },
      clientSidePagination: {
        type: 'toggle',
        displayName: 'Client-side pagination',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      serverSideSearch: {
        type: 'toggle',
        displayName: 'Server-side search',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      serverSideSort: {
        type: 'toggle',
        displayName: 'Server-side sort',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      serverSideFilter: {
        type: 'toggle',
        displayName: 'Server-side filter',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      actionButtonBackgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' }
        }
      },
      actionButtonTextColor: {
        type: 'color',
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' }
        }
      },
      displaySearchBox: {
        type: 'toggle',
        displayName: 'Show search box',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      showDownloadButton: {
        type: 'toggle',
        displayName: 'Show download button',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      showFilterButton: {
        type: 'toggle',
        displayName: 'Show filter button',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      showBulkUpdateActions: {
        type: 'toggle',
        displayName: 'Show update buttons',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      allowSelection: {
        type: 'toggle',
        displayName: 'Allow selection',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      showBulkSelector: {
        type: 'toggle',
        displayName: 'Bulk selection',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      highlightSelectedRow: {
        type: 'toggle',
        displayName: 'Highlight selected row',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      defaultSelectedRow: {
        type: 'code',
        displayName: 'Default selected row',
        validation: {
          schema: {
            type: 'object'
          }
        }
      },

      showAddNewRowButton: {
        type: 'toggle',
        displayName: 'Show add new row button',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop ' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    defaultSize: {
      width: 10,
      height: 200
    },
    events: {
      onRowHovered: { displayName: 'Row hovered' },
      onRowClicked: { displayName: 'Row clicked' },
      onBulkUpdate: { displayName: 'Save changes' },
      onPageChanged: { displayName: 'Page changed' },
      onSearch: { displayName: 'Search' },
      onCancelChanges: { displayName: 'Cancel changes' },
      onSort: { displayName: 'Sort applied' },
      onCellValueChanged: { displayName: 'Cell value changed' },
      onFilterChanged: { displayName: 'Filter changed' },
      onNewRowsAdded: { displayName: 'Add new rows' }
    },
    styles: {
      textColor: {
        type: 'color',
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' }
        }
      },
      actionButtonRadius: {
        type: 'code',
        displayName: 'Action Button Radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'boolean' }]
          }
        }
      },
      tableType: {
        type: 'select',
        displayName: 'Table type',
        options: [
          { name: 'Bordered', value: 'table-bordered' },
          { name: 'Borderless', value: 'table-borderless' },
          { name: 'Classic', value: 'table-classic' },
          { name: 'Striped', value: 'table-striped' },
          { name: 'Striped & bordered', value: 'table-striped table-bordered' }
        ],
        validation: {
          schema: { type: 'string' }
        }
      },
      cellSize: {
        type: 'select',
        displayName: 'Cell size',
        options: [
          { name: 'Compact', value: 'compact' },
          { name: 'Spacious', value: 'spacious' }
        ],
        validation: {
          schema: { type: 'string' }
        }
      },
      borderRadius: {
        type: 'code',
        displayName: 'Border Radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }]
          }
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
      selectedRow: {},
      changeSet: {},
      dataUpdates: [],
      pageIndex: 1,
      searchText: '',
      selectedRows: [],
      filters: []
    },
    actions: [
      {
        handle: 'setPage',
        displayName: 'Set page',
        params: [
          {
            handle: 'page',
            displayName: 'Page',
            defaultValue: '{{1}}'
          }
        ]
      },
      {
        handle: 'selectRow',
        displayName: 'Select row',
        params: [
          { handle: 'key', displayName: 'Key' },
          { handle: 'value', displayName: 'Value' }
        ]
      },
      {
        handle: 'deselectRow',
        displayName: 'Deselect row'
      },
      {
        handle: 'discardChanges',
        displayName: 'Discard Changes'
      },
      {
        handle: 'discardNewlyAddedRows',
        displayName: 'Discard newly added rows'
      },
      {
        displayName: 'Download table data',
        handle: 'downloadTableData',
        params: [
          {
            handle: 'type',
            displayName: 'Type',
            options: [
              { name: 'Download as Excel', value: 'xlsx' },
              { name: 'Download as CSV', value: 'csv' },
              { name: 'Download as PDF', value: 'pdf' }
            ],
            defaultValue: `{{Download as Excel}}`,
            type: 'select'
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
        title: { value: 'Table' },
        visible: { value: '{{true}}' },
        loadingState: { value: '{{false}}' },
        data: {
          value:
            "{{ [ \n\t\t{ id: 1, name: 'Sarah', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}"
        },
        useDynamicColumn: { value: '{{false}}' },
        columnData: {
          value:
            "{{[{name: 'email', key: 'email'}, {name: 'Full name', key: 'name', isEditable: true}]}}"
        },
        rowsPerPage: { value: '{{10}}' },
        serverSidePagination: { value: '{{false}}' },
        enableNextButton: { value: '{{true}}' },
        enablePrevButton: { value: '{{true}}' },
        totalRecords: { value: '' },
        clientSidePagination: { value: '{{true}}' },
        serverSideSort: { value: '{{false}}' },
        serverSideFilter: { value: '{{false}}' },
        displaySearchBox: { value: '{{true}}' },
        showDownloadButton: { value: '{{true}}' },
        showFilterButton: { value: '{{true}}' },
        autogenerateColumns: { value: true, generateNestedColumns: true },
        columns: {
          value: [
            {
              name: 'id',
              id: 'e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737',
              autogenerated: true
            },
            {
              name: 'name',
              id: '5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a',
              autogenerated: true
            },
            {
              name: 'email',
              id: 'afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f',
              autogenerated: true
            }
          ]
        },
        showBulkUpdateActions: { value: '{{true}}' },
        showBulkSelector: { value: '{{false}}' },
        highlightSelectedRow: { value: '{{false}}' },
        columnSizes: { value: '{{({})}}' },
        actions: { value: [] },
        enabledSort: { value: '{{true}}' },
        hideColumnSelectorButton: { value: '{{false}}' },
        defaultSelectedRow: { value: '{{{"id":1}}}' },
        showAddNewRowButton: { value: '{{true}}' },
        allowSelection: { value: '{{true}}' }
      },
      events: [],
      styles: {
        textColor: { value: '#000' },
        actionButtonRadius: { value: '0' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        cellSize: { value: 'compact' },
        borderRadius: { value: '0' },
        tableType: { value: 'table-bordered' }
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
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }]
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
