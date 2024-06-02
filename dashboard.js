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
                        <div class="card-header">${domainInfo.domain_name}</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p>Expiry Date: ${domainInfo.expiry_date}</p>
                                    <p>Status: ${history.order_status}</p>
                                </div>
                                <div class="col-md-6 text-right">
                                    <button class="btn btn-primary" onclick="viewOrderDetails('${order.order_id}')">View Details</button>
                                </div>
                            </div>
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
