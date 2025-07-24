"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Order = {
  tiktokUser: string;
  productCode: string;
  timestamp: number;
};

export default function LiveOrdersOverlay() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });
    socket.on("new-order", (order: Order) => {
      setOrders((prev) => [order, ...prev].slice(0, 20)); // keep latest 20
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-white bg-opacity-95 rounded-lg shadow-lg p-4 max-w-sm w-full mx-auto mt-8 overflow-y-auto max-h-[80vh] border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-center">Live Orders</h2>
      <ul className="flex flex-col gap-3">
        {orders.length === 0 ? (
          <li className="text-center text-gray-500">No orders yet.</li>
        ) : (
          orders.map((order, idx) => (
            <li key={idx} className="flex flex-col items-start p-3 bg-gray-50 rounded shadow-sm">
              <span className="font-semibold text-blue-600">@{order.tiktokUser}</span>
              <span className="text-gray-800">{order.productCode}</span>
              <span className="text-xs text-gray-500 mt-1">
                {new Date(order.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
} 