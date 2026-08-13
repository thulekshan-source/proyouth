import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ShieldCheck, TrendingUp } from 'lucide-react';

export const Parents: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-pink-100 text-pink-600 rounded-full mb-6">
          <Heart size={40} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{t('parents.title')}</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          {t('parents.content')}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
        <div className="flex gap-4">
          <div className="mt-1 shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">High Growth & Salary</h3>
            <p className="text-gray-600">Modern fields like IT and Digital Marketing offer starting salaries that are often much higher than traditional entry-level jobs.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-1 shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Stability</h3>
            <p className="text-gray-600">Many of these skills are recognized worldwide. Your child can work for international companies while staying safely at home in Sri Lanka.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
