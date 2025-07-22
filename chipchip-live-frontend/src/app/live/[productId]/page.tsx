// src/app/live/[productId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams }           from 'next/navigation';
import { useForm }             from 'react-hook-form';

type Product = {
  id: string;
  name: string;
  image: string;
  livePrice: number;
  joinedCount: number;
  targetCount: number;
};

type FormData = {
  phone: string;
  address: string;
};

export default function LiveProductPage() {
  // 1) Grab the raw params
  const params = useParams();
  // 2) Normalize to a single string (Next may return string|string[])
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;

  const [product, setProduct]     = useState<Product | null>(null);
  const [loading, setLoading]     = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();

  // — OPTION A: MOCK DATA —
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProduct({
        id:           productId!,     // now always a string
        name:         'Test Mango',
        image:        '/mango.jpg',
        livePrice:    109,
        joinedCount:  3,
        targetCount:  10,
      });
      setLoading(false);
    }, 500);
  }, [productId]);

  const onSubmit = handleSubmit((data) => {
    console.log('Mock order submitted:', {
      productCode: product?.id,
      phone:       data.phone,
      address:     data.address,
    });
    setSubmitted(true);
  });

  if (loading) return <p>Loading…</p>;
  if (!product) return <p>Product not found.</p>;
  if (submitted) return <p>🎉 Thank you! Your order is confirmed.</p>;

  const progress = Math.round((product.joinedCount / product.targetCount) * 100);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', borderRadius: 8 }}
      />

      <p style={{ fontSize: '1.25rem', margin: '1rem 0' }}>
        Live Price: <strong>ETB {product.livePrice}</strong>
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            background: '#eee',
            borderRadius: 4,
            overflow: 'hidden',
            height: 12,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: '#4caf50',
              height: '100%',
            }}
          />
        </div>
        <small>
          {product.joinedCount} of {product.targetCount} joined ({progress}%)
        </small>
      </div>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
        <label>
          Phone
          <input
            type="tel"
            {...register('phone', { required: true })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 4 }}
          />
        </label>

        <label>
          Address
          <textarea
            {...register('address', { required: true })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 4 }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
