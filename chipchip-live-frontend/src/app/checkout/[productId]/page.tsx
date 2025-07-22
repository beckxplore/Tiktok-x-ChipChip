'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type Product = {
  id: string;
  name: string;
  image: string;
  livePrice: number;
  joinedCount: number;
  targetCount: number;
};

type FormData = { fullname: string; phone: string; address: string; quantity: number };

export default function CheckoutPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    axios
      .get<Product>(`${process.env.NEXT_PUBLIC_CHIPCHIP_API_URL}/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(() => {});
  }, [productId]);

  const onSubmit = (data: FormData) => {
    axios.post(`${process.env.NEXT_PUBLIC_CHIPCHIP_API_URL}/orders`, {
      productCode: productId,
      ...data,
    });
  };

  if (!product) return <p className="p-4 text-text-secondary">Loading…</p>;

  const pct = Math.round((product.joinedCount / product.targetCount) * 100);

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="w-full max-w-md bg-surface p-6 rounded-lg shadow-md space-y-4">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <h2 className="text-2xl font-bold text-text-primary">{product.name}</h2>
        <p className="text-lg text-primary">ETB {product.livePrice}</p>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-secondary h-full" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm text-text-secondary">{product.joinedCount} of {product.targetCount} joined ({pct}%)</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('fullname')}
            placeholder="Full Name"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <input
            {...register('phone')}
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <input
            {...register('address')}
            placeholder="Delivery Address"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-text-primary">
              Quantity (kg)
            </label>
            <input
              {...register('quantity', { valueAsNumber: true })}
              type="number"
              defaultValue={1}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md font-semibold shadow-md"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
} 