import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import mentorsData from '../data/mentors.json';
import type { Mentor } from '../types';

export const Mentors: React.FC = () => {
  const { t, i18n } = useTranslation();
  const mentors = mentorsData as Mentor[];
  const lang = i18n.language as 'en' | 'ta' | 'si';

  const handleAsk = () => {
    alert("Contact form will be implemented here!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('mentors.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map(mentor => (
          <div key={mentor.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={mentor.imageUrl} 
                alt={mentor.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                <p className="text-purple-600 font-medium text-sm">
                  {mentor.profession[lang] || mentor.profession.en}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">
              {mentor.bio[lang] || mentor.bio.en}
            </p>
            
            <button 
              onClick={handleAsk}
              className="w-full py-3 flex items-center justify-center gap-2 bg-gray-50 hover:bg-purple-50 text-gray-900 hover:text-purple-700 font-semibold rounded-xl border border-gray-200 hover:border-purple-200 transition-colors"
            >
              <MessageCircle size={18} />
              {t('mentors.ask_btn')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
