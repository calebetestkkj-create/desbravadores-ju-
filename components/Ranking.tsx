
import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { Member, Unit } from '../types';

interface RankingProps {
  members: Member[];
  units: Unit[];
}

const Ranking: React.FC<RankingProps> = ({ members, units }) => {
  const sortedMembers = [...members].sort((a, b) => b.score - a.score);
  const podium = sortedMembers.slice(0, 3);
  const others = sortedMembers.slice(3);

  const getUnitName = (id: string) => units.find(u => u.id === id)?.name || 'S/U';

  if (members.length === 0) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <i className="fa-solid fa-trophy text-6xl text-white/5"></i>
      <p className="text-[#A0A0A0] font-black uppercase tracking-widest">Sem membros registrados no ranking.</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-5xl font-black text-[#E0E0E0] tracking-tighter uppercase">Elite Juá</h2>
        <p className="text-[#A0A0A0] font-medium leading-relaxed">O reconhecimento daqueles que vão além do dever.</p>
      </div>

      <section className="flex flex-col md:flex-row items-end justify-center gap-6 pt-16">
        {podium[1] && (
          <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-64">
            <div className="relative mb-6">
              <img src={podium[1].avatar} className="w-24 h-24 rounded-[2rem] border-4 border-[#A0A0A0]/40 p-1 bg-[#121212]" alt="" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#A0A0A0] text-[#121212] rounded-xl flex items-center justify-center font-black shadow-lg">2</div>
            </div>
            <div className="bg-[#1E1E1E] w-full rounded-t-[2.5rem] p-8 border-x border-t border-white/5 text-center space-y-2 h-48 flex flex-col justify-center">
              <h4 className="font-black text-lg text-[#E0E0E0] truncate">{podium[1].name}</h4>
              <p className="text-2xl font-black text-[#A0A0A0]">{podium[1].score}</p>
              <p className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.2em]">{getUnitName(podium[1].unitId)}</p>
            </div>
          </div>
        )}

        {podium[0] && (
          <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-80 -mt-10">
            <div className="relative mb-8">
              <i className="fa-solid fa-crown text-5xl text-[#FFD700] absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce"></i>
              <img src={podium[0].avatar} className="w-32 h-32 rounded-[2.5rem] border-4 border-[#D4AF37] p-1 bg-[#121212] shadow-[0_0_40px_rgba(212,175,55,0.2)]" alt="" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-[#121212] rounded-2xl flex items-center justify-center font-black text-xl shadow-xl border-4 border-[#121212]">1</div>
            </div>
            <div className="bg-[#1E1E1E] w-full rounded-t-[3rem] p-10 border-x border-t border-[#D4AF37]/30 text-center space-y-3 h-64 flex flex-col justify-center shadow-2xl relative">
              <h4 className="font-black text-2xl text-[#E0E0E0] truncate">{podium[0].name}</h4>
              <p className="text-4xl font-black text-[#FFD700]">{podium[0].score}</p>
              <p className="text-xs font-black uppercase text-[#D4AF37] tracking-[0.3em]">{getUnitName(podium[0].unitId)}</p>
            </div>
          </div>
        )}

        {podium[2] && (
          <div className="order-3 flex flex-col items-center w-full md:w-64">
            <div className="relative mb-6">
              <img src={podium[2].avatar} className="w-20 h-20 rounded-[1.8rem] border-4 border-[#CD7F32]/40 p-1 bg-[#121212]" alt="" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#CD7F32] text-[#121212] rounded-xl flex items-center justify-center font-black shadow-lg">3</div>
            </div>
            <div className="bg-[#1E1E1E] w-full rounded-t-[2.5rem] p-8 border-x border-t border-white/5 text-center space-y-2 h-40 flex flex-col justify-center">
              <h4 className="font-black text-lg text-[#E0E0E0] truncate">{podium[2].name}</h4>
              <p className="text-xl font-black text-[#CD7F32]">{podium[2].score}</p>
              <p className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.2em]">{getUnitName(podium[2].unitId)}</p>
            </div>
          </div>
        )}
      </section>

      <section className="bg-[#1E1E1E] rounded-[3rem] border border-white/5 overflow-hidden">
        <div className="divide-y divide-white/5">
          {others.map((m, i) => (
            <div key={m.id} className="p-6 flex items-center gap-6 hover:bg-white/5 transition-all">
              <span className="w-10 font-black text-[#A0A0A0] text-xl">#0{i + 4}</span>
              <img src={m.avatar} className="w-14 h-14 rounded-2xl border-2 border-white/5" alt="" />
              <div className="flex-1">
                <h5 className="font-black text-lg text-[#E0E0E0] truncate">{m.name}</h5>
                <p className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest">{getUnitName(m.unitId)}</p>
              </div>
              <div className="text-right">
                 <p className="text-2xl font-black text-[#E0E0E0]">{m.score}</p>
                 <p className="text-[8px] font-black uppercase tracking-widest text-[#D4AF37]">Pontos</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Ranking;
