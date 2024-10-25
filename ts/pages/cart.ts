

interface Product {
    id: string;
    nameProduct: string;
    price: string; // Chuyển giá thành kiểu number để dễ tính toán
    trademark: string;
    image: string;
}

// Lấy danh sách sản phẩm từ localStorage
function getCartItems(): Product[] {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Hiển thị sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById("cart-items");
    const totalAmountElement = document.getElementById("total-amount");

    if (cartContainer) {
        cartContainer.innerHTML = ""; // Xóa nội dung cũ

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Giỏ hàng của bạn hiện đang trống.</p>";
            totalAmountElement.textContent = "0";
            return;
        }

        let total = 0; // Biến để lưu tổng giá
        let formattedTotal = ''
        cartItems.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.className = "flex items-center justify-between border-b py-4";
            productDiv.innerHTML = `
                <div class="flex items-center">
                    <img src="${product.image}" alt="${product.nameProduct}" class="w-20 h-20 object-cover rounded-md mr-4">
                    <div>
                        <h2 class="font-semibold">${product.nameProduct}</h2>
                        <div class="flex">
                            <p class="text-gray-500">${product.trademark}</p>
                            <button onclick="removeFromCart('${product.id}')" 
                            class="text-red-500 hover:text-red-700 ml-4">
                                 Xóa
                            </button>
                        </div>
                    </div>
                     
                </div>
                <p class="text-red-500 font-bold">${product.price} VND</p>
               
            `;
            cartContainer.appendChild(productDiv);
            const price: number = parseFloat(product.price.replace(/,/g, ''));
            total += price   
             formattedTotal = total.toLocaleString('en-US');
        });

        totalAmountElement.textContent = formattedTotal;// Cập nhật tổng giá trị
    }
}
function removeFromCart(productId) {
    try {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const cartItems = JSON.parse(cart);
            const updatedCart = cartItems.filter(item => item.id !== productId);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            displayCartItems(); // Refresh cart display
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
}
// Gọi hàm hiển thị sản phẩm khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", displayCartItems);

// Tính năng thanh toán (Chỉ là demo, bạn có thể thêm logic thực tế)
document.getElementById("checkout-btn")?.addEventListener("click", () => {
    alert("Chức năng thanh toán chưa được triển khai!");
});
