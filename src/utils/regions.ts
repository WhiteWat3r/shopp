const regionsArray = [
  'Россия',
  'Украина',
  'Республика Беларусь',
  'Казахстан',
  'Армения',
  'Азербайджан',
  'Киргизстан',
  'Республика Молдова',
  'Таджикистан',
  'Туркменистан',
  'Узбекистан',
  'Грузия',
];

export const formatRegionString = (region: string) => {
  switch (region) {
    case 'CIS(-Aze)':
      return regionsArray.filter((reg) => reg !== 'Азербайджан').join(', ');
    case 'CIS(-Aze, -Geo)':
      return regionsArray.filter((reg) => reg !== 'Азербайджан' && reg !== 'Грузия').join(', ');
    case 'Region free':
      return 'В любом регионе мира';
    case 'CIS(-Rus, -Bel)':
      return regionsArray
        .filter((reg) => (reg !== 'Россия') && (reg !== 'Республика Беларусь'))
        .join(', ');
    default:
      return regionsArray.join(', ');
  }
};
