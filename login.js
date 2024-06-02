$(document).ready(function() {
    function fetchUserData() {
        return $.getJSON('user.json');
    }

    $('#loginForm').submit(function(event) {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        fetchUserData().done(function(users) {
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                localStorage.setItem('loginTime', Date.now());
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        }).fail(function() {
            alert('Error fetching user data');
        });
    });

    function checkLoginStatus() {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime && Date.now() - loginTime > 86400000) { // 24 hours in milliseconds
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loginTime');
        }
    }

    checkLoginStatus();
});
