const logoutHandler = async () => {
    console.log("Logout attempted.");

    const response = await fetch('api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' },
    });

    if (response.ok) {
        console.log("Logout response successful.");
        document.location.replace('/');
    } else {
        alert('Failed to logout.');
    }
};

document
    .querySelector('.logout-btn')
    .addEventListener('click', logoutHandler);