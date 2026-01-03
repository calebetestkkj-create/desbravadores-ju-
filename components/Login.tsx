
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '5972') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="h-screen w-full bg-[#121212] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#1E1E1E] rounded-[3rem] p-10 border border-[#D4AF37]/20 shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center text-[#121212] mx-auto shadow-gold mb-6">
            <i className="fa-solid fa-triangle-exclamation text-4xl"></i>
          </div>
          <h1 className="text-3xl font-black text-[#E0E0E0] uppercase tracking-tighter">Diretoria Juá</h1>
          <p className="text-[#A0A0A0] font-medium">Acesso restrito ao painel de comando.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest ml-4">Senha do Diretor</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-[#121212] border ${error ? 'border-red-500' : 'border-white/5'} rounded-2xl py-4 px-6 text-center text-xl tracking-[1em] focus:outline-none focus:border-[#D4AF37] transition-all`}
              placeholder="••••"
            />
            {error && <p className="text-center text-red-500 text-[10px] font-bold uppercase animate-bounce mt-2">Senha Incorreta</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#121212] rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Entrar no Painel
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-widest">Pela Graça de Deus, sou fiel e puro.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
