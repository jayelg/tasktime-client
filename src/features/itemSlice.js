import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.tasks.push({ id: Date.now(), text: action.payload });
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemProperty: (state, action) => {
        const { itemId, property, value } = action.payload;
        const index = state.items.findIndex((item) => item.itemId === itemId);
        if (index !== -1) {
          state.items[index][property] = value;
        }
      },
  },
});

export const { addItem, deleteItem, updateItemProperty } = itemSlice.actions;

export default itemSlice.reducer;