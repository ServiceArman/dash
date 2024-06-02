$(document).ready(function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    $('#name').val(user.name);
    $('#email').val(user.email);
    $('#phone').val(user.phone);
    $('#password').val(user.password);

    $('#profileForm').submit(function(event) {
        event.preventDefault();

        user.name = $('#name').val();
        user.email = $('#email').val();
        user.phone = $('#phone').val();
        user.password = $('#password').val();

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Profile updated successfully!');
    });

    $('#logoutBtn').click(function() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loginTime');
        window.location.href = 'login.html';
    });
});
