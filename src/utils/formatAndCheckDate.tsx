export function formatAndCheckDate(inputDate: string) {
    const months:{[key: string]: string} = {
        'января': 'Jan', 'февраля': 'Feb', 'марта': 'Mar',
        'апреля': 'Apr', 'мая': 'May', 'июня': 'Jun',
        'июля': 'Jul', 'августа': 'Aug', 'сентября': 'Sep',
        'октября': 'Oct', 'ноября': 'Nov', 'декабря': 'Dec'
      };
    
      const [day, month, year] = inputDate.split(' ');
    
      if (day && months[month] && year) {
        return `${day} ${months[month]}, ${year}`;
      } else {
        return inputDate;
      }
    }