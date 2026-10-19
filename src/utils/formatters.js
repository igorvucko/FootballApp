export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const positionLabel = (pos) => {
  const map = {
    goalkeeper: 'Golman',
    defender: 'Branič',
    midfielder: 'Vezni',
    forward: 'Napadač',
    wing: 'Krilo'
  };
  return map[pos] || pos;
};

export const fullName = (player) => {
  if (!player) return '';
  return `${player.firstName} ${player.lastName}`;
};
