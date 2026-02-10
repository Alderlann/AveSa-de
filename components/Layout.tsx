
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
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#F8FAFC] shadow-2xl relative overflow-x-hidden">
      <header className="glass sticky top-0 z-[100] px-6 py-4 flex items-center justify-between border-b border-slate-200/50">
        <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">AviSaúde</span>
        </Link>
        <div className="flex items-center space-x-3">
            {profissional ? (
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expert Mode</span>
                </div>
            ) : (
                !isHome && (
                    <Link to="/birds" className="text-xs bg-slate-900 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-slate-200 transition-transform active:scale-95">
                        Minhas Aves
                    </Link>
                )
            )}
        </div>
      </header>

      <main className="flex-1 pb-32">
        {children}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] glass rounded-[32px] p-2 flex items-center justify-around shadow-2xl z-[1000] border border-white/50">
          <Link to="/" className={`p-3 rounded-2xl transition-all ${isHome ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'text-slate-400 hover:text-teal-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </Link>
          <Link to="/birds" className={`p-3 rounded-2xl transition-all ${location.pathname.startsWith('/birds') ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'text-slate-400 hover:text-teal-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </Link>
          <Link to="/expert/login" className={`p-3 rounded-2xl transition-all ${location.pathname.startsWith('/expert') ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'text-slate-400 hover:text-teal-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </Link>
          {profissional && (
              <button onClick={onLogout} className="p-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
          )}
      </nav>
    </div>
  );
};

export default Layout;
