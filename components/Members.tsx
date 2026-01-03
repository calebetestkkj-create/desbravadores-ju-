
import React, { useState } from 'react';
import { Member, Unit, ClubeClass } from '../types';

interface MembersProps {
  members: Member[];
  units: Unit[];
  classes: ClubeClass[];
  onAddMember: (m: Member) => void;
  onAddUnit: (u: Unit) => void;
  onAddClass: (c: ClubeClass) => void;
  onUpdateScore: (id: string, pts: number) => void;
  onRemoveMember: (id: string) => void;
}

const Members: React.FC<MembersProps> = ({ members, units, classes, onAddMember, onAddUnit, onAddClass, onUpdateScore, onRemoveMember }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', photo: '', unitId: '', classId: '', rank: 'Desbravador' });
  const [newName, setNewName] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.unitId || !newMember.classId) return;
    
    onAddMember({
      id: Date.now().toString(),
      name: newMember.name,
      rank: newMember.rank,
      unitId: newMember.unitId,
      classId: newMember.classId,
      avatar: newMember.photo || '',
      active: true,
      score: 0,
      specialties: [],
      achievements: []
    });
    
    setNewMember({ name: '', photo: '', unitId: '', classId: '', rank: 'Desbravador' });
    setShowAddMember(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#E0E0E0] tracking-tighter uppercase">Gestão de Pelotão</h2>
          <p className="text-[#A0A0A0] font-medium">Controle total das unidades e membros.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setShowAddUnit(true)} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#121212] transition-all">Nova Unidade</button>
          <button onClick={() => setShowAddClass(true)} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#121212] transition-all">Nova Classe</button>
          <button onClick={() => setShowAddMember(true)} className="px-6 py-3 bg-[#D4AF37] text-[#121212] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-gold">Novo Membro</button>
        </div>
      </div>

      {/* Seção de Unidades/Membros */}
      <div className="space-y-12">
        {units.length > 0 ? units.map(unit => {
          const unitMembers = members.filter(m => m.unitId === unit.id);
          return (
            <div key={unit.id} className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                <span className="w-10 h-1 bg-[#D4AF37] rounded-full"></span>
                Unidade {unit.name}
                <span className="text-xs bg-[#1E1E1E] px-3 py-1 rounded-full text-[#A0A0A0] font-bold">{unitMembers.length} Membros</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {unitMembers.map(m => (
                  <div key={m.id} className="bg-[#1E1E1E] rounded-[2.5rem] p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden">
                    <button 
                      onClick={() => onRemoveMember(m.id)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-500 hover:text-white"
                    >
                      <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                    
                    <div className="flex items-center gap-6 mb-6">
                      {m.avatar ? (
                        <img src={m.avatar} className="w-16 h-16 rounded-2xl border-2 border-[#D4AF37] object-cover" alt="" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl border-2 border-[#D4AF37] bg-[#121212] flex items-center justify-center text-xl font-black text-[#D4AF37]">
                          {getInitials(m.name)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-black text-xl text-[#E0E0E0] truncate max-w-[150px]">{m.name}</h4>
                        <p className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest">
                          {classes.find(c => c.id === m.classId)?.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-[#121212] rounded-2xl p-4 flex justify-between items-center border border-white/5">
                      <div>
                        <p className="text-[8px] font-black uppercase text-[#A0A0A0]">Pontos</p>
                        <p className="text-2xl font-black text-[#D4AF37]">{m.score}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => onUpdateScore(m.id, -10)} className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">-10</button>
                        <button onClick={() => onUpdateScore(m.id, 10)} className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all">+10</button>
                      </div>
                    </div>
                  </div>
                ))}
                {unitMembers.length === 0 && (
                  <div className="col-span-full py-10 text-center border border-dashed border-white/10 rounded-3xl text-[#A0A0A0] text-sm uppercase font-bold">Unidade vazia. Cadastre membros para começar.</div>
                )}
              </div>
            </div>
          )
        }) : (
          <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-white/5 rounded-[3rem]">
            <i className="fa-solid fa-users-rectangle text-5xl text-white/5"></i>
            <p className="text-[#A0A0A0] font-black uppercase tracking-[0.2em]">Inicie cadastrando as Unidades do Clube.</p>
          </div>
        )}
      </div>

      {/* MODAIS DE CADASTRO */}
      {showAddMember && (
        <div className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-6">
          <form onSubmit={handleAddMember} className="bg-[#1E1E1E] p-10 rounded-[3rem] border border-[#D4AF37]/30 w-full max-w-md space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-center uppercase tracking-tighter">Novo Desbravador</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#D4AF37] ml-2">Nome Completo</label>
                <input 
                  placeholder="Nome do Membro" 
                  className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 focus:border-[#D4AF37] outline-none"
                  value={newMember.name}
                  onChange={e => setNewMember({...newMember, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#D4AF37] ml-2">Foto URL (Opcional)</label>
                <input 
                  placeholder="https://..." 
                  className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 focus:border-[#D4AF37] outline-none"
                  value={newMember.photo}
                  onChange={e => setNewMember({...newMember, photo: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#D4AF37] ml-2">Unidade</label>
                  <select 
                    className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 focus:border-[#D4AF37] outline-none appearance-none"
                    onChange={e => setNewMember({...newMember, unitId: e.target.value})}
                  >
                    <option value="">Selecionar</option>
                    {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-[#D4AF37] ml-2">Classe</label>
                  <select 
                    className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 focus:border-[#D4AF37] outline-none appearance-none"
                    onChange={e => setNewMember({...newMember, classId: e.target.value})}
                  >
                    <option value="">Selecionar</option>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setShowAddMember(false)} className="flex-1 py-4 font-black uppercase text-xs text-[#A0A0A0]">Cancelar</button>
              <button type="submit" className="flex-1 py-4 bg-[#D4AF37] text-[#121212] rounded-xl font-black uppercase text-xs shadow-gold">Salvar Membro</button>
            </div>
          </form>
        </div>
      )}

      {(showAddUnit || showAddClass) && (
        <div className="fixed inset-0 z-[100] bg-[#121212]/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#1E1E1E] p-10 rounded-[3rem] border border-[#D4AF37]/30 w-full max-w-sm space-y-6">
            <h3 className="text-xl font-black text-center uppercase tracking-tighter">
              Adicionar {showAddUnit ? 'Unidade' : 'Classe'}
            </h3>
            <input 
              placeholder={`Nome da ${showAddUnit ? 'Unidade' : 'Classe'}`} 
              className="w-full bg-[#121212] p-4 rounded-xl border border-white/5 outline-none focus:border-[#D4AF37]"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              autoFocus
            />
            <div className="flex gap-4">
              <button onClick={() => {setShowAddUnit(false); setShowAddClass(false); setNewName('')}} className="flex-1 text-[#A0A0A0] font-black uppercase text-xs">Cancelar</button>
              <button onClick={() => {
                if (!newName) return;
                const item = { id: Date.now().toString(), name: newName };
                showAddUnit ? onAddUnit(item) : onAddClass(item);
                setNewName('');
                setShowAddUnit(false);
                setShowAddClass(false);
              }} className="flex-1 py-4 bg-[#D4AF37] text-[#121212] rounded-xl font-black uppercase text-xs">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
