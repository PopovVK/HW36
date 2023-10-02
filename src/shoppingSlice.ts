
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  caption: string;
  amount: number;
}

interface ShoppingState {
  items: Item[];
}

const initialState: ShoppingState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    editItem: (state, action: PayloadAction<Item>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.items[itemIndex] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem } = shoppingSlice.actions;

export default shoppingSlice.reducer;
