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
        const userOrders = orders.filter(order => order.user_id === user.user_id);

        if (userOrders.length === 0) {
            $('#orderHistory').append('<p>No orders found.</p>');
            return;
        }

        userOrders.forEach(order => {
            order.order_history.forEach(history => {
                const domainInfo = order.domain_info[0]; // Assuming there's only one domain per order
                $('#orderHistory').append(`
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${domainInfo.domain_name}</h5>
                            <p class="card-text">Expiry Date: ${domainInfo.expiry_date}</p>
                            <p class="card-text">Status: ${history.order_status}</p>
                            <button class="btn btn-primary" onclick="viewOrderDetails('${order.order_id}')">View Details</button>
                        </div>
                    </div>
                `);
            });
        });
    }).fail(function() {
        alert('Error fetching order data');
    });
});

function viewOrderDetails(orderId) {
    localStorage.setItem('selectedOrder', orderId);
    window.location.href = 'orderdetails.html';
}
