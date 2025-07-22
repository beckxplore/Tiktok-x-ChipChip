import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface BuyerInfoFormProps {
  onSubmit: (buyerInfo: { name: string; phone: string; address: string }) => void;
  onBack: () => void;
  total: number;
}

export default function BuyerInfoForm({ onSubmit, onBack, total }: BuyerInfoFormProps) {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-() ]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">
            {t('form.full_name')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full min-h-touch px-4 py-3 border rounded-md text-body ${
              errors.name ? 'border-error' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-error text-small mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">
            {t('form.phone')}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full min-h-touch px-4 py-3 border rounded-md text-body ${
              errors.phone ? 'border-error' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-error text-small mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">
            {t('form.address')}
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className={`w-full min-h-touch px-4 py-3 border rounded-md text-body resize-none ${
              errors.address ? 'border-error' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Enter your delivery address"
          />
          {errors.address && (
            <p className="text-error text-small mt-1">{errors.address}</p>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-body font-medium text-text-primary">
              {t('order.total')}
            </span>
            <span className="text-xl font-bold text-primary-500">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 min-h-touch bg-gray-100 text-text-primary font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 min-h-touch bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
          >
            {t('form.place_order')}
          </button>
        </div>
      </form>
    </div>
  );
} 