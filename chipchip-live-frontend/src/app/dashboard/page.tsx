// src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';

type Order = { tiktokUser: string; productCode: string; timestamp: number };

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const handleGoLive = () => {
    /* your existing logic */
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Live Orders</h2>

      <button
        onClick={handleGoLive}
        className="w-full bg-primary text-white py-2 rounded-md font-semibold shadow-md"
      >
        Go Live & Activate Overlay
      </button>

      {orders.length === 0 ? (
        <p className="text-text-secondary">No live orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o, i) => (
            <div
              key={i}
              className="bg-surface p-4 rounded-lg shadow-sm space-y-1"
            >
              <div className="font-bold text-text-primary">
                @{o.tiktokUser}
              </div>
              <div className="italic text-secondary">{o.productCode}</div>
              <div className="text-sm text-text-secondary">
                {new Date(o.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
