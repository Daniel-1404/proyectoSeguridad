async function checkSession() {
    try {
      const response = await fetch('http://localhost:3000/api/session/validation', {
        credentials: 'include',  
      });
  
      if (response.ok) {
        const data = await response.json();

        if (!data.loggedIn) {        
          window.location.href = '/index.html';         
        }
      } else {
        window.location.href = '/index.html';
      }
    } catch (error) {
      console.error('Error en la solicitud de sesión:', error);
      window.location.href = '/index.html'; 
    }
  }
  
checkSession();