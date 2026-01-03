
import React, { useState } from 'react';
import { Task, Member } from '../types';

interface TasksProps {
  tasks: Task[];
  members: Member[];
  onComplete: (id: string) => void;
  onAddTask: (t: Task) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, members, onComplete, onAddTask }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedToId: '', points: 50 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignedToId) return;
    onAddTask({
      id: Date.now().toString(),
      ...newTask,
      date: new Date().toLocaleDateString(),
      status: 'pending'
    });
    setShowAdd(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#E0E0E0] tracking-tighter mb-2 uppercase">Escala de Serviço</h2>
          <p className="text-[#A0A0A0] font-medium">Delegue missões e distribua honrarias.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-8 py-4 bg-[#D4AF37] text-[#121212] rounded-2xl font-black uppercase tracking-widest text-xs shadow-gold">Criar Nova Missão</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.length > 0 ? tasks.map(task => (
          <div key={task.id} className="bg-[#1E1E1E] rounded-[2rem] p-6 border border-white/5 flex flex-col md:flex-row items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${task.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
              <i className={`fa-solid ${task.status === 'completed' ? 'fa-check-double' : 'fa-clock'}`}></i>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-xl">{task.title}</h4>
              <p className="text-[10px] font-black uppercase text-[#A0A0A0]">Responsável: {members.find(m => m.id === task.assignedToId)?.name || 'Removido'}</p>
            </div>
            {task.status !== 'completed' && (
              <button onClick={() => onComplete(task.id)} className="px-6 py-3 bg-[#D4AF37] text-[#121212] rounded-xl font-black text-[10px] uppercase">Finalizar Mission</button>
            )}
          </div>
        )) : <div className="p-20 text-center border border-dashed border-white/10 rounded-[3rem] text-[#A0A0A0] font-black uppercase">Vazio</div>}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-6">
          <form onSubmit={handleAdd} className="bg-[#1E1E1E] p-10 rounded-[3rem] border border-[#D4AF37]/30 w-full max-w-md space-y-6">
            <h3 className="text-2xl font-black text-center uppercase tracking-tighter">Nova Missão</h3>
            <div className="space-y-4">
              <input placeholder="Título da Tarefa" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]" onChange={e => setNewTask({...newTask, title: e.target.value})} />
              <select className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none" onChange={e => setNewTask({...newTask, assignedToId: e.target.value})}>
                <option value="">Delegar para...</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <input type="number" placeholder="Valor em Pontos" className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none" defaultValue={50} onChange={e => setNewTask({...newTask, points: Number(e.target.value)})} />
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className="flex-1 font-black text-[#A0A0A0] uppercase text-xs">Cancelar</button>
              <button type="submit" className="flex-1 py-4 bg-[#D4AF37] text-[#121212] rounded-xl font-black uppercase text-xs">Atribuir</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tasks;
