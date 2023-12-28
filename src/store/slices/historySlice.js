import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    allConversions: [],
    selectedConversions: []
  },
  reducers: {
    addConversion(state, action) {
      if (((state.allConversions[state.allConversions.length - 1]?.converter === action.payload.converter &&
        action.payload.converter !== 'Currency') || state.allConversions[state.allConversions.length - 1]?.result === action.payload.result)) {
        state.allConversions[state.allConversions.length - 1] = action.payload;
      } else {
        state.allConversions.push(action.payload);
      }
    },
    toggleSelectedConversion(state, action) {
      if (action.payload.addOrRemove) {
        state.selectedConversions.push(action.payload.date);
      } else {
        state.selectedConversions = [...state.selectedConversions.filter((conversion) => (
          conversion !== action.payload.date
        ))];
      }
    },
    toggleAllSelectedConversions(state) {
      if (state.selectedConversions.length === 0) {
        state.selectedConversions = [...state.allConversions.map((conversion) => conversion.date)];
      } else {
        state.selectedConversions = [];
      }
    },
    deleteSelectedConversions(state) {
      state.allConversions = [...state.allConversions.filter((conversion) => (
        !state.selectedConversions.includes(conversion.date)
      ))];
      state.selectedConversions = [];
    }
  }
});

export const historyReducer = historySlice.reducer;
export const { addConversion, toggleSelectedConversion, toggleAllSelectedConversions, deleteSelectedConversions } = historySlice.actions;
