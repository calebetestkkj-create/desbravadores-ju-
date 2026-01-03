
import React, { useState } from 'react';
import { Activity } from '../types';

interface ActivitiesProps {
  activities: Activity[];
  onAddActivity: (a: Activity) => void;
}

const Activities: React.FC<ActivitiesProps> = ({ activities, onAddActivity }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newAct, setNewAct] = useState({ title: '', category: 'Recreação', duration: '30 min', description: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAct.title) return;
    onAddActivity({
      id: Date.now().toString(),
      ...newAct,
      instructions: [],
      materials: []
    });
    setShowAdd(false);
  };

  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#E0E0E0] tracking-tighter mb-2 uppercase">Acervo de Atividades</h2>
          <p className="text-[#A0A0A0] font-medium">O seu banco de conhecimentos recreativos.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-8 py-4 bg-[#D4AF37] text-[#121212] rounded-2xl font-black uppercase tracking-widest text-xs shadow-gold">Nova Atividade</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map(act => (
          <div key={act.id} className="bg-[#1E1E1E] rounded-[2.5rem] p-8 border border-white/5 space-y-4">
            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest">{act.category}</span>
            <h4 className="text-2xl font-black">{act.title}</h4>
            <p className="text-sm text-[#A0A0A0]">{act.description}</p>
            <div className="pt-4 border-t border-white/5 text-[10px] font-black uppercase text-[#A0A0A0] flex items-center gap-2">
              <i className="fa-regular fa-clock text-[#D4AF37]"></i> {act.duration}
            </div>
          </div>
        ))}
        {activities.length === 0 && <div className="lg:col-span-3 p-20 text-center border border-dashed border-white/10 rounded-[3rem] text-[#A0A0A0] uppercase font-black">Nenhuma atividade cadastrada.</div>}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-6">
          <form onSubmit={handleAdd} className="bg-[#1E1E1E] p-10 rounded-[3rem] border border-[#D4AF37]/30 w-full max-w-md space-y-6">
            <h3 className="text-2xl font-black text-center uppercase tracking-tighter">Nova Atividade</h3>
            <div className="space-y-4">
              <input placeholder="Nome da Brincadeira/Instrução" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewAct({...newAct, title: e.target.value})} />
              <input placeholder="Tempo Estimado (ex: 45 min)" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewAct({...newAct, duration: e.target.value})} />
              <textarea placeholder="Breve descrição" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none h-32" onChange={e => setNewAct({...newAct, description: e.target.value})} />
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className="flex-1 font-black text-[#A0A0A0] uppercase text-xs">Cancelar</button>
              <button type="submit" className="flex-1 py-4 bg-[#D4AF37] text-[#121212] rounded-xl font-black uppercase text-xs">Salvar Atividade</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Activities;
