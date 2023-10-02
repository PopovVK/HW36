
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addItem, editItem, deleteItem } from './actions';

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem, (state, action) => {
        state.items.push({
          id: Date.now(),
          caption: action.payload.caption,
          amount: action.payload.amount,
        });
      })
      .addCase(editItem, (state, action) => {
        const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
        if (itemIndex !== -1) {
          state.items[itemIndex].caption = action.payload.caption;
          state.items[itemIndex].amount = action.payload.amount;
        }
      })
      .addCase(deleteItem, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default shoppingSlice.reducer;
