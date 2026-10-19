export const validatePlayer = (player) => {
  const errors = {};

  if (!player.firstName?.trim()) {
    errors.firstName = 'Ime je obavezno';
  } else if (player.firstName.trim().length < 2) {
    errors.firstName = 'Ime mora imati najmanje 2 znaka';
  }

  if (!player.lastName?.trim()) {
    errors.lastName = 'Prezime je obavezno';
  } else if (player.lastName.trim().length < 2) {
    errors.lastName = 'Prezime mora imati najmanje 2 znaka';
  }

  if (!player.position) {
    errors.position = 'Pozicija je obavezna';
  }

  const number = Number(player.number);
  if (player.number === '' || isNaN(number) || number < 1 || number > 99) {
    errors.number = 'Broj dresa mora biti između 1 i 99';
  }

  const age = Number(player.age);
  if (player.age === '' || isNaN(age) || age < 15 || age > 55) {
    errors.age = 'Godine moraju biti između 15 i 55';
  }

  if (!player.teamId) {
    errors.teamId = 'Klub je obavezan';
  }

  if (player.nationality && player.nationality.trim().length < 2) {
    errors.nationality = 'Državljanstvo mora imati najmanje 2 znaka';
  }

  return errors;
};

export const validateTeam = (team) => {
  const errors = {};

  if (!team.name?.trim()) {
    errors.name = 'Naziv kluba je obavezan';
  } else if (team.name.trim().length < 2) {
    errors.name = 'Naziv mora imati najmanje 2 znaka';
  }

  if (!team.city?.trim()) {
    errors.city = 'Grad je obavezan';
  }

  const founded = Number(team.founded);
  const currentYear = new Date().getFullYear();
  if (team.founded === '' || isNaN(founded) || founded < 1850 || founded > currentYear) {
    errors.founded = `Godina osnivanja mora biti između 1850 i ${currentYear}`;
  }

  return errors;
};

export const validateMatch = (match) => {
  const errors = {};

  if (!match.homeTeamId) {
    errors.homeTeamId = 'Domaći klub je obavezan';
  }

  if (!match.awayTeamId) {
    errors.awayTeamId = 'Gostujući klub je obavezan';
  }

  if (match.homeTeamId && match.awayTeamId && match.homeTeamId === match.awayTeamId) {
    errors.awayTeamId = 'Klubovi moraju biti različiti';
  }

  const home = Number(match.homeScore);
  const away = Number(match.awayScore);

  if (match.homeScore === '' || isNaN(home) || home < 0) {
    errors.homeScore = 'Rezultat mora biti 0 ili više';
  }

  if (match.awayScore === '' || isNaN(away) || away < 0) {
    errors.awayScore = 'Rezultat mora biti 0 ili više';
  }

  if (!match.date) {
    errors.date = 'Datum je obavezan';
  }

  return errors;
};
