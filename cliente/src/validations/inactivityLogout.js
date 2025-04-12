let timer;

const resetTimer = () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/session/logout', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            sessionStorage.setItem('showInactivityAlert', 'true');
            window.location.replace('/index.html');
        } else {
            window.location.reload(); 
        }
    }catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
  }, 60 * 1000); 
};

['mousemove', 'keydown', 'click'].forEach(event => {
  window.addEventListener(event, resetTimer);
});


resetTimer();
