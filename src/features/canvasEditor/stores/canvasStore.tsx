import { create, zustandDevTools } from './utils';

const initialState = {
  currentLayout: 'desktop',
  isEditorActive: false
};

export const useEditorStore = create(
  zustandDevTools(
    (set, get) => ({
      ...initialState,
      actions: {
        toggleCurrentLayout: currentLayout => set({ currentLayout })
      }
    }),
    { name: 'Editor Store' }
  )
);
