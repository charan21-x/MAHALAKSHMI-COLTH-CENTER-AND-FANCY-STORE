        const API_URL = "https://mahalakshmi-backend-wy3h.onrender.com";

        async function getProducts() {
            try {
                const response = await fetch(`${API_URL}/products`);
                const products = await response.json();

                console.log(products);

                const container = document.getElementById("products");

                container.innerHTML = "";

                products.forEach(product => {
                    console.log("Adding:", product.name);
                    container.innerHTML += `
        <div style="border:2px solid black; padding:10px; margin:10px; background:white; color:black;">\
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p><strong>Category:</strong> ${product.category || "Fashion Item"}</p>
            <p><strong>Stock:</strong> ${product.stock || 0}</p>
            <button onclick='buyNow(${JSON.stringify(product)})'>Buy Now</button>
        </div>
    `;
                });

            } catch (error) {
                console.log("Error:", error);
            }
        }

        getProducts();
        let selectedProduct = null;

        function buyNow(product) {
            selectedProduct = product;
            document.getElementById("orderForm").style.display = "block";
        }
        async function confirmOrder() {

            const name = document.getElementById("customerName").value;
            const phone = document.getElementById("customerPhone").value;
            const address = document.getElementById("customerAddress").value;

            if (!name || !phone || !address) {
                alert("Please fill all details.");
                return;
            }

            const order = {
                productName: selectedProduct.name,
                price: selectedProduct.price,
                customerName: name,
                phone: phone,
                address: address
            };

            try {
                const response = await fetch(`${API_URL}/orders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(order)
                });

                const data = await response.json();

                if (data.acknowledged) {
                    alert("✅ Order Placed Successfully!");

                    document.getElementById("orderForm").style.display = "none";
                    document.getElementById("customerName").value = "";
                    document.getElementById("customerPhone").value = "";
                    document.getElementById("customerAddress").value = "";
                }

            } catch (error) {
                console.error(error);
                alert("Server Error");
            }
        }