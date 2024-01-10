import steam from '../assets/steam.png';
import epicGames from '../assets/epicGames.jpeg';
import question from '../assets/question.png';
import gog from '../assets/gog.png';

export const checkPlatform = (platform: string) => {
  switch (platform) {
    case 'Steam':
      return steam;
    case 'Epic Games':
      return epicGames;
    case 'GOG':
      return gog;
    default:
      return question;
  }
};
