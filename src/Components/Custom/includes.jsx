export function isObjectEmpty(obj) {
    for (const key in obj) {
      if (String(obj[key]).trim()=="") {
        return false; // If any value is empty, return false
      }
    }
    return true; // All values are non-empty, return true
  }

  export function ordinal(number) {
    let ends = ['th','st','nd','rd','th','th','th','th','th','th'];
    if (((number % 100) >= 11) && ((number % 100) <= 13)) {
        return number +'th';
    } else {
        return number+ends[number % 10];
    }
}

export function convertToRoman(num) { 
  if (num <= 0) { 
      return ""; 
  } 
  const romanNumerals = { 
      X: 10, 
      IX: 9, 
      V: 5, 
      IV: 4, 
      I: 1 
  }; 
  let roman = ""; 
 
    for (let key in romanNumerals) { 
        while (num >= romanNumerals[key]) { 
            roman += key; 
            num -= romanNumerals[key]; 
        } 
    } 
 
    return roman; 

}