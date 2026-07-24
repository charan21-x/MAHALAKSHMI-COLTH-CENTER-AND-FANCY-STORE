const API_URL = "https://mahalakshmi-backend-wy3h.onrender.com";

async function getOrders() {

    const response = await fetch(`${API_URL}/orders`);

    const orders = await response.json();

    const table = document.getElementById("ordersTable");

    table.innerHTML = "";

    orders.forEach(order => {

        table.innerHTML += `
        <tr>
            <td>${order.customerName}</td>
            <td>${order.phone}</td>
            <td>${order.productName}</td>
            <td>₹${order.price}</td>
            <td>${order.address}</td>
        </tr>
        `;
    });

}

getOrders();