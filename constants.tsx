
import { Achievement } from './types';

export const THEME = {
  bgPrimary: '#121212',
  bgSecondary: '#1E1E1E',
  goldPremium: '#D4AF37',
  goldBright: '#FFD700',
  textPrimary: '#E0E0E0',
  textSecondary: '#A0A0A0',
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Pioneiro', description: 'Completou 10 especialidades de habilidades manuais.', icon: 'fa-campground', category: 'habilidade' },
  { id: 'a2', title: 'Sentinela', description: 'Sempre pontual no hasteamento da bandeira.', icon: 'fa-flag', category: 'servico' },
  { id: 'a3', title: 'Capelão Júnior', description: 'Liderou 5 momentos de oração ou meditação.', icon: 'fa-book-bible', category: 'espiritual' },
  { id: 'a4', title: 'Mestre dos Nós', description: 'Executou todos os nós básicos em menos de 2 minutos.', icon: 'fa-link', category: 'habilidade' },
];

// All other mock lists removed to ensure empty start.
