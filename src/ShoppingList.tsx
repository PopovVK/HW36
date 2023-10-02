
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, editItem, deleteItem } from './shoppingSlice';
import './styles.css';
import { RootState } from './store';

interface Item {
  id: number;
  caption: string;
  amount: number;
}

const ShoppingList: React.FC = () => {
  const items = useSelector((state: RootState) => state.shopping.items);
  const dispatch = useDispatch();
  const [caption, setCaption] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editItemData, setEditItemData] = useState<Item | null>(null);

  const handleAddItem = () => {
    if (caption.trim() === '' || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Будь ласка, введіть коректні дані.');
      return;
    }

    if (editMode && editItemData) {
      dispatch(
        editItem({
          id: editItemData.id,
          caption,
          amount: Number(amount),
        })
      );
      setEditMode(false);
    } else {
      dispatch(
        addItem({
          id: Date.now(),
          caption,
          amount: Number(amount),
        })
      );
    }

    setCaption('');
    setAmount('');
    setEditItemData(null);
  };

  const handleEditClick = (item: Item) => {
    setEditMode(true);
    setCaption(item.caption);
    setAmount(item.amount.toString());
    setEditItemData(item);
  };

  const handleDeleteClick = (itemId: number) => {
    dispatch(deleteItem(itemId));
  };

  return (
    <div>
      <h2>Список покупок</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.caption} - {item.amount}{' '}
            <button onClick={() => handleEditClick(item)}>Редагувати</button>
            <button onClick={() => handleDeleteClick(item.id)}>Видалити</button>
          </li>
        ))}
      </ul>
      <h2>Додати покупку</h2>
      <input
        type="text"
        placeholder="Найменування"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Кількість"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddItem}>{editMode ? 'Редагувати' : 'Додати'}</button>
    </div>
  );
};

export default ShoppingList;
