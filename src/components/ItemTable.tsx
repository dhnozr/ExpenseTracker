import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

interface Item {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  shop: Item[];

  handleDeleteItem: (index: number) => void;
}

export const ItemTable = ({ shop, handleDeleteItem }: Props) => {
  const [category, setCategory] = useState('All Categories');
  const filteredShop = shop.filter(item => item.description !== '' && item.category !== '');
  const [shopItems, setShopItems] = useState<Item[]>(shop);

  useEffect(() => {
    setShopItems(shop.filter(item => item.description !== '' && item.category !== ''));
  }, [shop]);

  const [total, setTotal] = useState(0);

  // const categoryFilters = shopItems.filter(item => item.category === category);

  const showItems = shopItems.filter(item => {
    return category === 'All Categories' || item.category === category;
  });

  useEffect(() => {
    const calc = showItems.reduce((acc, curr) => acc + curr.amount, 0);

    setTotal(calc);
  }, [showItems, category]);

  const onDeleteItem = (index: number) => {
    const newShopItems = shopItems.filter((_, i) => i !== index);
    handleDeleteItem(index);

    setShopItems(newShopItems);
  };

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <>
      <div className='container'>
        <div className='mb-3'>
          <select name='select' className='form-select' onChange={handleOnChange}>
            <option defaultValue={'All categories'}>All categories</option>
            <option value='Groceries'>Groceries</option>
            <option value='Utilities'>Utilities</option>
            <option value='Entertainment'>Entertainment</option>
          </select>
        </div>
        <table className='table table-bordered align-middle text-center '>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th className='opacity-0'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {showItems.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{'$' + item.amount}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => onDeleteItem(index)} type='button' className='btn btn-outline-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td colSpan={3}>{total + '$'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
