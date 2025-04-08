async function checkLogin() {
    const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      //Validacion de datos del Form
      if (!ValidateData(username, password)) {
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/autentication/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        const rol = data.user?.nombre;

        if (res.ok) {
          
          if(rol == 'SuperAdmin'){
            window.location.href = '/public/views/crud_usuario/dashboard.html';

          }else if(rol == 'Auditor'){
            
          }else if(rol == 'Registrador'){
            window.location.href = '/public/views/crud_producto/dashboardProductos.html';

          }else{
            errorMsg.textContent = data.message || 'Error al iniciar sesión';
          }    
        } else {
          errorMsg.textContent = data.message || 'Usuario o contraseña incorrectos';
        }
      } catch (error) {
        errorMsg.textContent = 'Usuario o contraseña incorrectos';
      }
    });
}
checkLogin();


function ValidateData(username, password) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = ''; 
    const msg = 'Usuario o contraseña incorrectos';
  
    if (!username || !password) {
      errorMsg.textContent = 'Por favor, complete todos los campos.';
      return false;
    }
  
    if (username.length < 4 || username.length > 20) {
      errorMsg.textContent = msg;
      return false;
    }
  
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      errorMsg.textContent = msg;
      return false;
    }
  
    if (password.length < 3) {
      errorMsg.textContent = msg;
      return false;
    }
  
    return true;
  }
  
