import React, { FormEvent, FormEventHandler, useState } from 'react';
import { ItemTable } from './ItemTable';

export const Form = () => {
  const [shop, setShop] = useState([
    {
      description: '',
      amount: 0,
      category: '',
    },
  ]);

  const handleDeleteItem = (index: number) => {
    const newShopItems = shop.filter((_, i) => i !== index);
    setShop(newShopItems);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormData = new FormData(event.currentTarget);

    const formObj: { description: string; amount: number; category: string } = {
      description: newFormData.get('description') as string,
      amount: parseFloat(newFormData.get('amount') as string),
      category: newFormData.get('category') as string,
    };

    setShop(prev => {
      return [...prev, formObj];
    });
  };

  return (
    <>
      <form className='container mb-5' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input name='description' className='form-control' id='description' />
        </div>
        <div className='mb-3'>
          <label htmlFor='amount' className='form-label'>
            Amount
          </label>
          <input type='number' name='amount' className='form-control' id='amount' />
        </div>

        <div className='mb-3'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <select name='category' className='form-select' id='category' aria-label='Default select example'>
            <option value='Groceries'>Groceries</option>
            <option value='Utilities'>Utilities</option>
            <option value='Entertainment'>Entertainment</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>

      <ItemTable shop={shop} handleDeleteItem={handleDeleteItem} />
    </>
  );
};
