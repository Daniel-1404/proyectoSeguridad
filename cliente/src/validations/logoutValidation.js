// logoutValidation.js
function setupLogoutButtonListener() {
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:3000/api/session/logout', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    window.location.replace('/index.html');
                } else {
                    window.location.reload(); 
                }
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navObserver = new MutationObserver(() => {
        if (document.getElementById('logout-button')) {
            setupLogoutButtonListener();
            navObserver.disconnect(); 
        }
    });

    navObserver.observe(document.getElementById('nav-container'), {
        childList: true,
        subtree: true,
    });
});
