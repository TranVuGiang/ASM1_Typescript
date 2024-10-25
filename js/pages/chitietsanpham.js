const URL_API3 = "http://localhost:3000/";
let currentData = null;
function chitietsanpham(product) {
    currentData = product;
    return `
    <div class="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div class="flex flex-col lg:flex-row">
        <div class="lg:w-1/2">
          <img src="${product.image}" alt="${product.nameProduct}" class="w-full h-96 object-cover rounded-lg mb-4 lg:mb-0">
        </div>
        <div class="lg:w-1/2 lg:pl-10">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">${product.nameProduct}</h1>
          <p class="text-red-600 text-xl font-bold mb-4">${product.price} VND</p>
          <p class="text-gray-700 mb-6">Mô tả ngắn gọn về sản phẩm. Đây có thể là thông tin về tính năng, chất liệu và các điểm nổi bật của sản phẩm.</p>
          <div class="mb-4">
            <label for="quantity" class="block text-gray-700 mb-2">Số lượng:</label>
            <input type="number" id="quantity" name="quantity" min="1" value="1" class="border border-gray-300 rounded-md p-2 w-24">
          </div>
          <button class="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"  onclick="addToCart(currentData)">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  `;
}
function showProductDetail(productId) {
    fetch(URL_API3 + "list-product-home")
        .then((response) => response.json())
        .then((products) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const homeRender = document.querySelector("#chitiet");
            if (homeRender) {
                homeRender.innerHTML = chitietsanpham(product);
            }
        }
    })
        .catch((error) => console.error("Error fetching product detail:", error));
}
function addToCart(product) {
    try {
        const cart = localStorage.getItem("cart");
        const cartItems = cart ? JSON.parse(cart) : [];
        const quantity = document.getElementById('quantity').nodeValue;
        const cartItem = {
            ...product,
            quantity: parseInt(quantity)
        };
        cartItems.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert("Thêm giỏ hàng thành công!");
        console.log("Cart items:", cartItems);
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
}
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}
document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromUrl();
    if (productId) {
        showProductDetail(productId);
    }
    else {
        const homeRender = document.querySelector("#chitiet");
        if (homeRender) {
            homeRender.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
        }
    }
});
