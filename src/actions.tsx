
import { createAction } from '@reduxjs/toolkit';

export const addItem = createAction<{ caption: string; amount: number }>('addItem');
export const editItem = createAction<{ id: number; caption: string; amount: number }>('editItem');
export const deleteItem = createAction<number>('deleteItem');
