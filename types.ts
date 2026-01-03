
export interface ClubeClass {
  id: string;
  name: string;
}

export interface Unit {
  id: string;
  name: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'espiritual' | 'habilidade' | 'servico';
}

export interface Member {
  id: string;
  name: string;
  rank: string;
  unitId: string;
  classId: string;
  specialties: string[];
  avatar: string;
  active: boolean;
  score: number;
  achievements: string[];
}

export interface Task {
  id: string;
  title: string;
  assignedToId: string;
  date: string;
  status: 'pending' | 'completed' | 'ongoing';
  points: number;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  instructions: string[];
  materials: string[];
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'task' | 'achievement' | 'alert';
  timestamp: string;
  read: boolean;
}
