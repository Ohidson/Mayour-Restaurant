const cart = [];
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const finalTotalEl = document.getElementById('final-total');
const cartCountEl = document.getElementById('cart-count');
const payBtn = document.getElementById('pay-btn');

const deliveryFee = 800;

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);
        cart.push({ name, price });
        updateCart();
    });
});

function updateCart() {
    cartItemsEl.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, i) => {
        subtotal += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - ₦${item.price.toLocaleString()}</span>
            <button onclick="removeItem(${i})" style="color:red;background:none;border:none;cursor:pointer;">✕</button>
        `;
        cartItemsEl.appendChild(div);
    });

    const total = subtotal + deliveryFee;
    cartTotalEl.textContent = subtotal.toLocaleString();
    finalTotalEl.textContent = total.toLocaleString();
    cartCountEl.textContent = cart.length;
    payBtn.disabled = cart.length === 0;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Flutterwave Payment
payBtn.addEventListener('click', () => {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();

    if (!name || !phone || !address) {
        alert('Please fill in all delivery details!');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0) + deliveryFee;

    // Generate Order Items Summary
    const orderItems = cart.map(item => `${item.name} (₦${item.price})`).join(', ');
    const orderSummary = `${orderItems}\nDelivery: ₦${deliveryFee}\nTotal: ₦${totalAmount.toLocaleString()}`;

    // Flutterwave Payment
    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-XXXXXXXXXXXXXXXXXXXXXXXXXX-X", // Replace with your TEST or LIVE key
        tx_ref: "MAYOUR-" + Date.now(),
        amount: totalAmount,
        currency: "NGN",
        payment_options: "card,ussd,banktransfer,mobilemoney",
        customer: {
            email: "customer@example.com", // You can ask for email too
            phone_number: phone,
            name: name,
        },
        meta: {
            address: address,
            order_details: orderSummary
        },
        customizations: {
            title: "Mayour Restaurant",
            description: "Payment for food order",
            logo: "https://via.placeholder.com/128?text=M",
        },
        callback: function (data) {
            console.log("Payment successful:", data);
            alert(`Payment Successful! 🎉\nReference: ${data.transaction_id}\nYour order is confirmed. We'll deliver soon!`);
            closePaymentModal(); // Close modal
            cart.length = 0;
            updateCart();
            document.querySelectorAll('.delivery-form input').forEach(i => i.value = '');
        },
        onclose: function() {
            // User closed modal without completing payment
        }
    });
});