'use client';

import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  price: number;
  unit: string;
};

export default function ProductsPage() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    /* your createProduct logic */
    reset();
  };

  return (
    <div className="flex justify-center p-4 md:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-surface p-6 rounded-lg shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-text-primary">
          Add / Manage Product
        </h2>

        <div>
          <label className="block mb-1 font-medium text-text-primary">
            Product Name
          </label>
          <input
            {...register('name')}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Mango"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-text-primary">
            Price (ETB)
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="150"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-text-primary">
            Unit (e.g. kg, pcs)
          </label>
          <input
            {...register('unit')}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="kg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md font-semibold shadow-md"
        >
          Create Product
        </button>
      </form>
    </div>
  );
} 