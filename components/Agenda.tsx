
import React, { useState } from 'react';
import { Event } from '../types';

interface AgendaProps {
  events: Event[];
  onAddEvent: (e: Event) => void;
}

const Agenda: React.FC<AgendaProps> = ({ events, onAddEvent }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' });
  
  const now = new Date();
  const monthName = now.toLocaleString('pt-BR', { month: 'long' });
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    onAddEvent({
      id: Date.now().toString(),
      ...newEvent,
      date: new Date(newEvent.date)
    });
    setShowAdd(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#E0E0E0] tracking-tighter uppercase">Cronograma Juá</h2>
          <p className="text-[#A0A0A0] font-medium capitalize">{monthName} de {now.getFullYear()}</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-8 py-4 bg-[#D4AF37] text-[#121212] rounded-2xl font-black uppercase tracking-widest text-xs shadow-gold">Agendar Evento</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-[#1E1E1E] rounded-[3rem] p-8 border border-white/5">
            <div className="grid grid-cols-7 gap-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
                <div key={d} className="text-center text-[10px] font-black text-[#D4AF37] uppercase tracking-widest pb-4">{d}</div>
              ))}
              {calendarDays.map(day => {
                const isToday = day === now.getDate();
                const hasEvent = events.some(e => e.date.getDate() === day && e.date.getMonth() === now.getMonth());
                return (
                  <div key={day} className={`aspect-square rounded-2xl border ${isToday ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-[#121212]/50'} flex flex-col items-center justify-center p-2 group hover:border-[#D4AF37]/50 transition-all cursor-pointer relative`}>
                    <span className={`text-lg font-black ${isToday ? 'text-[#D4AF37]' : 'text-[#A0A0A0]'}`}>{day}</span>
                    {hasEvent && <div className="absolute bottom-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-gold"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tighter">Próximos Compromissos</h3>
          <div className="space-y-4">
            {events.length > 0 ? events.map(e => (
              <div key={e.id} className="bg-[#1E1E1E] p-6 rounded-3xl border border-white/5 relative group">
                <p className="text-[8px] font-black text-[#D4AF37] uppercase mb-1">{e.date.toLocaleDateString()} • {e.time}</p>
                <h4 className="font-bold text-[#E0E0E0]">{e.title}</h4>
                <p className="text-[10px] text-[#A0A0A0] mt-1 italic">{e.location}</p>
              </div>
            )) : <p className="text-center text-[#A0A0A0] py-10 text-xs italic">Nada agendado.</p>}
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-6">
          <form onSubmit={handleAdd} className="bg-[#1E1E1E] p-10 rounded-[3rem] border border-[#D4AF37]/30 w-full max-w-md space-y-6">
            <h3 className="text-2xl font-black text-center uppercase tracking-tighter">Novo Evento</h3>
            <div className="space-y-4">
              <input placeholder="Título do Evento" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              <input type="date" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              <input type="time" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
              <input placeholder="Local" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className="flex-1 font-black text-[#A0A0A0] uppercase text-xs">Cancelar</button>
              <button type="submit" className="flex-1 py-4 bg-[#D4AF37] text-[#121212] rounded-xl font-black uppercase text-xs">Agendar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Agenda;
