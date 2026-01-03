
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Ranking from './components/Ranking';
import Tasks from './components/Tasks';
import Activities from './components/Activities';
import Agenda from './components/Agenda';
import Login from './components/Login';
import { Member, Task, Notification, Unit, ClubeClass, Activity, Event } from './types';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [director, setDirector] = useState({
    name: 'Maranhão',
    photo: 'https://i.pravatar.cc/150?u=admin'
  });
  
  const [members, setMembers] = useState<Member[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [classes, setClasses] = useState<ClubeClass[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const updateScore = (memberId: string, points: number) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, score: m.score + points } : m));
    addNotification('Pontos Atualizados', `Um membro recebeu ${points} pontos.`, 'achievement');
  };

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === 'completed') return;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    updateScore(task.assignedToId, task.points);
  };

  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  return (
    <Router>
      <Layout 
        director={director}
        onUpdateDirector={setDirector}
        notifications={notifications} 
        onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
      >
        <Routes>
          <Route path="/" element={<Dashboard members={members} tasks={tasks} events={events} />} />
          <Route path="/pelotao" element={
            <Members 
              members={members} 
              units={units} 
              classes={classes} 
              onAddMember={(m) => setMembers([...members, m])}
              onAddUnit={(u) => setUnits([...units, u])}
              onAddClass={(c) => setClasses([...classes, c])}
              onUpdateScore={updateScore}
              onRemoveMember={(id) => setMembers(members.filter(m => m.id !== id))}
            />
          } />
          <Route path="/ranking" element={<Ranking members={members} units={units} />} />
          <Route path="/escala" element={
            <Tasks 
              tasks={tasks} 
              members={members} 
              onComplete={completeTask} 
              onAddTask={(t) => setTasks([...tasks, t])}
            />
          } />
          <Route path="/atividades" element={
            <Activities 
              activities={activities} 
              onAddActivity={(a) => setActivities([...activities, a])} 
            />
          } />
          <Route path="/agenda" element={
            <Agenda 
              events={events} 
              onAddEvent={(e) => setEvents([...events, e])} 
            />
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
