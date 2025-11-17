import React from 'react';

interface HeaderProps {
  currentView: 'form' | 'dashboard';
  setView: (view: 'form' | 'dashboard') => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  // FIX: Changed type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
}> = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-brand-blue-600 text-white'
        : 'text-gray-600 hover:bg-brand-blue-100 hover:text-brand-blue-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const ChartBarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  );

  const DocumentTextIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm2 1a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V5z" clipRule="evenodd" />
    </svg>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-brand-blue-800">교회 주간 행정보고서</h1>
          </div>
          <nav className="flex items-center gap-2">
            <NavButton
              label="대시보드"
              isActive={currentView === 'dashboard'}
              onClick={() => setView('dashboard')}
              icon={ChartBarIcon}
            />
            <NavButton
              label="보고서 작성"
              isActive={currentView === 'form'}
              onClick={() => setView('form')}
              icon={DocumentTextIcon}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};
