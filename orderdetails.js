$(document).ready(function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const selectedDomain = localStorage.getItem('selectedDomain');
    if (!selectedDomain) {
        alert('No domain selected');
        window.location.href = 'dashboard.html';
        return;
    }

    function fetchOrderData() {
        return $.getJSON('order.json');
    }

    fetchOrderData().done(function(orders) {
        const order = orders.find(order => order.domain_info.some(domain => domain.domain_name === selectedDomain && order.email === user.email));

        if (!order) {
            $('#orderDetails').append('<p>Order details not found.</p>');
            return;
        }

        const domain = order.domain_info.find(domain => domain.domain_name === selectedDomain);

        $('#orderDetails').append(`
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Domain Details
                            </button>
                        </h2>
                    </div>
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <p>Domain Name: ${domain.domain_name}</p>
                            <p>Registrar: ${domain.registrar}</p>
                            <p>Registration Date: ${domain.registration_date}</p>
                            <button class="btn btn-primary">Renew</button>
                            <button class="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Name Servers
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                            <input type="text" class="form-control mb-2" value="${domain.name_servers[0]}" required>
                            <input type="text" class="form-control mb-2" value="${domain.name_servers[1]}" required>
                            <button class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Control Panel Access
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                            <p>URL: ${domain.control_panel_access.url}</p>
                            <p>Username: ${domain.control_panel_access.username}</p>
                            <p>Password: ${domain.control_panel_access.password}</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingFour">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Contact Information
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                        <div class="card-body">
                            <p>Registrar Name: ${domain.owner.name}</p>
                            <p>Email: ${domain.owner.contact_email}</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingFive">
                        <h2 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Domain Transfer
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                        <div class="card-body">
                            <input type="text" class="form-control mb-2" placeholder="Transfer Company" required>
                            <input type="text" class="form-control mb-2" placeholder="Customer Phone" required>
                            <button class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }).fail(function() {
        alert('Error fetching order data');
    });
});
