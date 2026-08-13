import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Banknote, GraduationCap, Building2, Award, Briefcase } from 'lucide-react';
import careersData from '../data/careers.json';
import type { Career } from '../types';
import clsx from 'clsx';

export const Careers: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const careers = careersData as Career[];
  const lang = i18n.language as 'en' | 'ta' | 'si';

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('careers.title')}</h2>
        <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
          {careers.length} Matches
        </div>
      </div>

      <div className="space-y-4">
        {careers.map((career) => {
          const isExpanded = expandedId === career.id;
          
          return (
            <div 
              key={career.id} 
              className={clsx(
                "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                isExpanded ? "border-purple-300 shadow-lg" : "border-gray-200 shadow-sm hover:border-purple-200"
              )}
            >
              {/* Header (Always visible) */}
              <button 
                onClick={() => toggleExpand(career.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start gap-4 focus:outline-none"
              >
                <div className="hidden sm:flex w-12 h-12 shrink-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl items-center justify-center text-purple-600">
                  <Briefcase size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {career.title[lang] || career.title.en}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {career.description[lang] || career.description.en}
                  </p>
                </div>
                
                <div className="shrink-0 pt-2 text-gray-400">
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>

              {/* Expandable Details */}
              <div 
                className={clsx(
                  "grid transition-all duration-300 ease-in-out",
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-5 sm:p-6 pt-0 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      
                      {/* Salary */}
                      <div className="bg-green-50/50 p-4 rounded-xl flex items-start gap-3">
                        <Banknote className="text-green-600 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-1">{t('careers.salary')}</p>
                          <p className="text-gray-900 font-medium">{career.salaryRange[lang] || career.salaryRange.en}</p>
                        </div>
                      </div>

                      {/* Qualifications */}
                      <div className="bg-blue-50/50 p-4 rounded-xl flex items-start gap-3">
                        <GraduationCap className="text-blue-600 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">{t('careers.qualifications')}</p>
                          <p className="text-gray-900">{career.qualifications[lang] || career.qualifications.en}</p>
                        </div>
                      </div>

                      {/* Institutes */}
                      <div className="bg-orange-50/50 p-4 rounded-xl flex items-start gap-3">
                        <Building2 className="text-orange-600 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs font-semibold text-orange-800 uppercase tracking-wider mb-1">{t('careers.institutes')}</p>
                          <p className="text-gray-900">{career.institutes[lang] || career.institutes.en}</p>
                        </div>
                      </div>

                      {/* Scholarships */}
                      <div className="bg-purple-50/50 p-4 rounded-xl flex items-start gap-3">
                        <Award className="text-purple-600 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">{t('careers.scholarships')}</p>
                          <p className="text-gray-900">{career.scholarships[lang] || career.scholarships.en}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
