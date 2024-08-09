document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/passwords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ site, username, password }),
    });

    if (response.ok) {
        document.getElementById('site').value = '';
        document.getElementById('username').value = '';
        document.getElementById('passwords').value = '';
        loadPasswords(); // Cargar la lista de contraseñas después de guardar
    } else {
        console.error('Error al guardar la contraseña');
    }
});

async function loadPasswords() {
    const response = await fetch('/passwords');
    const passwords = await response.json();
    const passwordList = document.getElementById('passwords');
    passwordList.innerHTML = '';

    passwords.forEach(pwd => {
        const li = document.createElement('li');
        li.textContent = `${pwd.site} - ${pwd.username}`;
        passwordList.appendChild(li);
    });
}

// Cargar las contraseñas al iniciar
loadPasswords();

