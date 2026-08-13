import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, WifiOff, User as UserIcon, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

export const TopHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Mock offline status for now
  const isOffline = false;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
          M
        </div>
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          MyFuture.lk
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isOffline && (
          <div className="flex items-center gap-1 text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            <WifiOff size={14} />
            <span className="hidden sm:inline">{t('landing.offline_badge')}</span>
          </div>
        )}
        
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <Globe size={18} />
            <span className="uppercase">{i18n.language}</span>
          </button>
          
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
            <div className="py-1">
              {[
                { code: 'en', label: 'English' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'si', label: 'සිංහල' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={clsx(
                    "block w-full text-left px-4 py-2 text-sm transition-colors",
                    i18n.language === lang.code ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Auth Section */}
        {user ? (
          <div className="relative group">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors">
              <UserIcon size={18} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  {t('auth.logout')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link 
            to="/login"
            className="hidden sm:flex items-center justify-center px-4 py-1.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
          >
            {t('auth.login_title')}
          </Link>
        )}
      </div>
    </header>
  );
};
