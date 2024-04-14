export function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Define an array of month names
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    // Get the month, day, and year from the date object
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Create a suffix for the day (e.g., "st", "nd", "rd", "th")
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }
  
    // Format the date string
    return `${monthNames[monthIndex]} ${day}${daySuffix}, ${year}`;
  }
  