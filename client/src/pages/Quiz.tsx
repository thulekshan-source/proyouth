import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export const Quiz: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [stream, setStream] = useState('');
  const [interest, setInterest] = useState('');

  const handleNext = () => {
    if (step === 1 && stream) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handleSubmit = () => {
    if (stream && interest) {
      // In a real app, you would pass these to an AI backend
      // For now, just navigate to results
      navigate('/careers');
    }
  };

  const streamOptions = [
    { id: 'maths', label: t('quiz.options.maths'), icon: '📐' },
    { id: 'science', label: t('quiz.options.science'), icon: '🔬' },
    { id: 'arts', label: t('quiz.options.arts'), icon: '🎨' },
    { id: 'commerce', label: t('quiz.options.commerce'), icon: '📊' },
    { id: 'technology', label: t('quiz.options.technology'), icon: '💻' },
    { id: 'ol', label: t('quiz.options.ol'), icon: '🎓' },
  ];

  const interestOptions = [
    { id: 'tech', label: 'Technology & Computers', icon: '💻' },
    { id: 'health', label: 'Helping People / Healthcare', icon: '🏥' },
    { id: 'business', label: 'Business & Management', icon: '💼' },
    { id: 'creative', label: 'Creative & Design', icon: '✨' },
    { id: 'hands-on', label: 'Practical / Hands-on work', icon: '🛠️' },
    { id: 'agriculture', label: 'Agriculture & Nature', icon: '🌱' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('quiz.title')}</h2>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mt-6">
          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
          <span className="text-sm font-medium text-gray-500">
            {step}/2
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{t('quiz.step1')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streamOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setStream(opt.id)}
                  className={clsx(
                    "relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 text-left",
                    stream === opt.id 
                      ? "border-purple-600 bg-purple-50 shadow-md shadow-purple-100" 
                      : "border-gray-100 bg-white hover:border-purple-200 hover:bg-gray-50"
                  )}
                >
                  <span className="text-2xl mr-3">{opt.icon}</span>
                  <span className={clsx("font-medium", stream === opt.id ? "text-purple-900" : "text-gray-700")}>
                    {opt.label}
                  </span>
                  {stream === opt.id && (
                    <CheckCircle2 className="absolute right-4 text-purple-600" size={20} />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!stream}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                {t('quiz.next')} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft size={20} /> Back
            </button>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{t('quiz.step2')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interestOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInterest(opt.id)}
                  className={clsx(
                    "relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 text-left",
                    interest === opt.id 
                      ? "border-purple-600 bg-purple-50 shadow-md shadow-purple-100" 
                      : "border-gray-100 bg-white hover:border-purple-200 hover:bg-gray-50"
                  )}
                >
                  <span className="text-2xl mr-3">{opt.icon}</span>
                  <span className={clsx("font-medium", interest === opt.id ? "text-purple-900" : "text-gray-700")}>
                    {opt.label}
                  </span>
                  {interest === opt.id && (
                    <CheckCircle2 className="absolute right-4 text-purple-600" size={20} />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!interest}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {t('quiz.submit')} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
