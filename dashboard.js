$(document).ready(function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    $('#userName').text(`Hi! ${user.name}`);

    function fetchOrderData() {
        return $.getJSON('order.json');
    }

    fetchOrderData().done(function(orders) {
        const userOrders = orders.filter(order => order.email === user.email);

        if (userOrders.length === 0) {
            $('#ordersList').append('<p>No orders found.</p>');
            return;
        }

        userOrders.forEach(order => {
            order.domain_info.forEach(domain => {
                $('#ordersList').append(`
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${domain.domain_name} <span class="float-right" style="cursor:pointer;" onclick="viewOrderDetails('${domain.domain_name}')">...</span></h5>
                                <p class="card-text">Expiry Date: ${domain.expiry_date}</p>
                                <p class="card-text">Status: ${order.order_history[0].order_status}</p>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    }).fail(function() {
        alert('Error fetching order data');
    });

    function checkLoginStatus() {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime && Date.now() - loginTime > 86400000) { // 24 hours in milliseconds
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loginTime');
            window.location.href = 'login.html';
        }
    }

    checkLoginStatus();
});

function viewOrderDetails(domainName) {
    localStorage.setItem('selectedDomain', domainName);
    window.location.href = 'orderdetails.html';
}
