
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Profissional } from '../types';

interface Props {
    children: React.ReactNode;
    profissional: Profissional | null;
    onLogout: () => void;
}

const Layout: React.FC<Props> = ({ children, profissional, onLogout }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      <header className="bg-teal-700 text-white p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tighter">AviSaúde</span>
        </Link>
        <div className="flex items-center space-x-2">
            {profissional ? (
                <Link to="/expert/portal" className="text-[10px] bg-teal-900 border border-teal-600 px-3 py-1 rounded-full font-bold flex items-center uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Especialista
                </Link>
            ) : (
                !isHome && (
                    <Link to="/birds" className="text-xs bg-teal-600 hover:bg-teal-500 px-3 py-1.5 rounded-full transition font-bold uppercase tracking-wider">
                        Minhas Aves
                    </Link>
                )
            )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t grid grid-cols-4 p-3 z-50">
          <Link to="/" className={`flex flex-col items-center ${isHome ? 'text-teal-700' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">Início</span>
          </Link>
          <Link to="/birds" className={`flex flex-col items-center ${location.pathname.startsWith('/birds') ? 'text-teal-700' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">Aves</span>
          </Link>
          <Link to="/expert/login" className={`flex flex-col items-center ${location.pathname.startsWith('/expert') ? 'text-teal-700' : 'text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">PRO</span>
          </Link>
          {profissional ? (
              <button onClick={onLogout} className="flex flex-col items-center text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">Sair</span>
              </button>
          ) : (
            <div className="flex flex-col items-center text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                <span className="text-[9px] font-bold mt-0.5 uppercase tracking-tighter">-</span>
            </div>
          )}
      </nav>
    </div>
  );
};

export default Layout;
