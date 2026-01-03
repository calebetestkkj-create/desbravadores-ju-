
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { THEME } from '../constants';
import { Notification } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  director: { name: string; photo: string };
  onUpdateDirector: (data: { name: string; photo: string }) => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, director, onUpdateDirector, notifications, onMarkRead }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempDirector, setTempDirector] = useState(director);

  const navItems = [
    { path: '/', label: 'Início', icon: 'fa-house' },
    { path: '/pelotao', label: 'Pelotão', icon: 'fa-users' },
    { path: '/ranking', label: 'Ranking', icon: 'fa-trophy' },
    { path: '/escala', label: 'Escala', icon: 'fa-calendar-check' },
    { path: '/atividades', label: 'Atividades', icon: 'fa-gamepad' },
    { path: '/agenda', label: 'Agenda', icon: 'fa-calendar-days' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSaveSettings = () => {
    onUpdateDirector(tempDirector);
    setShowSettings(false);
  };

  return (
    <div className="flex h-screen bg-[#121212] overflow-hidden text-[#E0E0E0]">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-[#1E1E1E] border-r border-[#D4AF37]/10 p-6 shadow-2xl z-50">
        <div className="flex items-center space-x-4 mb-12 px-2 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-xl flex items-center justify-center text-[#121212] shadow-lg shadow-[#D4AF37]/20 group-hover:rotate-12 transition-transform">
            <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tighter leading-none">CLUBE <span className="text-[#D4AF37]">JUÁ</span></h1>
            <p className="text-[10px] text-[#A0A0A0] font-bold tracking-[0.2em]">DISTRITO JUAZEIRO</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]' 
                    : 'text-[#A0A0A0] hover:text-[#E0E0E0] hover:bg-white/5'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-6 text-center text-xl`}></i>
                <span className="font-bold tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div 
            onClick={() => { setTempDirector(director); setShowSettings(true); }}
            className="flex items-center space-x-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer group"
          >
            <img src={director.photo} className="w-12 h-12 rounded-xl border-2 border-[#D4AF37] object-cover" alt="Admin" />
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-black truncate group-hover:text-[#D4AF37] transition-colors">{director.name}</p>
              <p className="text-[10px] text-[#D4AF37] font-bold">DIRETOR GERAL</p>
            </div>
            <i className="fa-solid fa-gear text-[#A0A0A0] text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_top_right,#1e1e1e,transparent)]">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#121212]/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
          <h2 className="text-xl font-black text-[#A0A0A0] hidden md:block uppercase tracking-widest">
            {navItems.find(i => i.path === location.pathname)?.label || 'Painel'}
          </h2>
          
          <div className="md:hidden flex items-center space-x-3">
             <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-[#121212]"><i className="fa-solid fa-triangle-exclamation"></i></div>
             <span className="font-black text-lg">JUÁ</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showNotifications ? 'bg-[#D4AF37] text-[#121212]' : 'bg-white/5 text-[#A0A0A0] hover:text-[#D4AF37]'}`}
              >
                <i className="fa-regular fa-bell text-xl"></i>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-[#121212] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#121212] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute top-full right-0 mt-4 w-96 bg-[#1E1E1E]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                      <h4 className="font-black text-sm uppercase tracking-widest">Notificações</h4>
                      <span className="text-[10px] px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full font-bold">{unreadCount} Novas</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-10 text-center text-[#A0A0A0] italic">Silêncio no pelotão...</div>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            onClick={() => onMarkRead(n.id)}
                            className={`p-6 border-b border-white/5 transition-all cursor-pointer hover:bg-white/5 ${!n.read ? 'bg-[#D4AF37]/5' : 'opacity-60'}`}
                          >
                            <div className="flex gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                n.type === 'achievement' ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                <i className={`fa-solid ${n.type === 'achievement' ? 'fa-trophy' : 'fa-bolt'}`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-sm text-[#E0E0E0] truncate">{n.title}</h5>
                                <p className="text-xs text-[#A0A0A0] mt-1 leading-relaxed">{n.message}</p>
                                <p className="text-[10px] text-[#D4AF37] mt-2 font-bold uppercase">{n.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <button 
              onClick={() => { setTempDirector(director); setShowSettings(true); }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#121212] rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
            >
              Configurar
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto pb-24 md:pb-0">
            {children}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#1E1E1E]/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around md:hidden z-50 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-14 transition-all ${
                location.pathname === item.path ? 'text-[#D4AF37] scale-110' : 'text-[#A0A0A0]'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-xl`}></i>
              <span className="text-[8px] font-black mt-1 uppercase tracking-tighter">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-[#1E1E1E] p-10 rounded-[3rem] border border-[#D4AF37]/30 w-full max-w-md space-y-6 animate-in zoom-in-95">
              <h3 className="text-2xl font-black text-center uppercase tracking-tighter">Perfil do Diretor</h3>
              
              <div className="flex justify-center mb-6">
                 <img src={tempDirector.photo} className="w-24 h-24 rounded-2xl border-2 border-[#D4AF37] object-cover" alt="Preview" />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#D4AF37] ml-2">Nome de Exibição</label>
                  <input 
                    placeholder="Nome do Diretor" 
                    className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 focus:border-[#D4AF37] outline-none"
                    value={tempDirector.name}
                    onChange={e => setTempDirector({...tempDirector, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#D4AF37] ml-2">Link da Foto (URL)</label>
                  <input 
                    placeholder="URL da Imagem" 
                    className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 focus:border-[#D4AF37] outline-none"
                    value={tempDirector.photo}
                    onChange={e => setTempDirector({...tempDirector, photo: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowSettings(false)} 
                  className="flex-1 py-4 font-black uppercase text-xs text-[#A0A0A0]"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveSettings}
                  className="flex-1 py-4 bg-[#D4AF37] text-[#121212] rounded-xl font-black uppercase text-xs shadow-gold"
                >
                  Salvar Perfil
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;
