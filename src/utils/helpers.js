export const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', { 
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' 
  });
};

export const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit', hour12: true 
  }).toLowerCase() + ' IST'; 
};
