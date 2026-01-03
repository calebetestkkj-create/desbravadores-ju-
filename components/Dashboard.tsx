
import React from 'react';
import { Member, Task, Event } from '../types';

interface DashboardProps {
  members: Member[];
  tasks: Task[];
  events: Event[];
}

const Dashboard: React.FC<DashboardProps> = ({ members, tasks, events }) => {
  const nextEvent = events.length > 0 ? events[0] : null;
  const sortedMembers = [...members].sort((a, b) => b.score - a.score);
  const pendingTasks = tasks.filter(t => t.status !== 'completed');

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#D4AF37] p-10 text-[#121212] shadow-2xl group">
        <div className="relative z-10 md:w-2/3">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none uppercase">Comando Juá</h2>
          <p className="text-lg font-bold opacity-80 mb-8 max-w-lg">O sistema está pronto. Cadastre seus membros e comece o planejamento das atividades.</p>
          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-3 bg-[#121212] text-[#D4AF37] rounded-xl font-black uppercase tracking-widest text-xs">
              {members.length} Membros Cadastrados
            </div>
          </div>
        </div>
        <i className="fa-solid fa-shield-halved absolute -bottom-10 -right-10 text-[200px] opacity-10 rotate-12"></i>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
            <span className="w-2 h-8 bg-[#D4AF37] rounded-full"></span>
            Próximo Evento
          </h3>
          
          {nextEvent ? (
            <div className="bg-[#1E1E1E] rounded-[2.5rem] p-8 border border-white/5 shadow-xl">
              <div className="flex gap-8 items-center">
                <div className="w-32 h-32 bg-[#121212] rounded-3xl flex flex-col items-center justify-center border-2 border-[#D4AF37]/20">
                  <span className="text-3xl font-black text-[#D4AF37]">{nextEvent.date.getDate()}</span>
                  <span className="text-[10px] font-black uppercase text-[#A0A0A0]">{nextEvent.date.toLocaleString('pt-BR', { month: 'short' })}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black">{nextEvent.title}</h4>
                  <p className="text-[#A0A0A0] text-sm mt-2">{nextEvent.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1E1E1E] rounded-[2.5rem] p-12 border border-dashed border-white/10 text-center">
              <p className="text-[#A0A0A0] font-bold uppercase tracking-widest">Nenhum evento agendado</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter">Líderes Atuais</h3>
          <div className="bg-[#1E1E1E] rounded-[2.5rem] p-6 border border-white/5 space-y-4">
            {sortedMembers.length > 0 ? sortedMembers.slice(0, 3).map((m, i) => (
              <div key={m.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                <span className="font-black text-[#D4AF37]">{i+1}º</span>
                <p className="font-bold flex-1">{m.name}</p>
                <p className="font-black text-[#D4AF37]">{m.score}</p>
              </div>
            )) : (
              <p className="text-center py-4 text-[#A0A0A0] text-xs">Aguardando dados...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
