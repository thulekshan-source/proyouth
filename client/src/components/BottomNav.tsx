import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Lightbulb, Briefcase, Users, Heart } from 'lucide-react';
import clsx from 'clsx';

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/quiz', icon: Lightbulb, label: t('nav.quiz') },
    { to: '/careers', icon: Briefcase, label: t('nav.careers') },
    { to: '/mentors', icon: Users, label: t('nav.mentors') },
    { to: '/parents', icon: Heart, label: t('nav.parents') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sm:hidden">
      <ul className="flex justify-around items-center">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300",
                  isActive 
                    ? "text-purple-600 font-semibold transform scale-105" 
                    : "text-gray-500 hover:text-purple-500 hover:bg-purple-50"
                )
              }
            >
              <item.icon size={22} strokeWidth={2.5} />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
