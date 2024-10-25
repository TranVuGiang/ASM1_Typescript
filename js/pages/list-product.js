const URL_API2 = "http://localhost:3000/";
async function fetchProducts2() {
    try {
        const response = await fetch(URL_API2 + "list-product-home");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const products = await response.json();
        displayProducts2(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
    }
}
function displayProducts2(products) {
    const str = products
        .map((product) => `
      <div class="border p-4 rounded-lg shadow-lg cursor-pointer" onclick="location.href='chitietsanpham.html?id=${product.id}'">
        <img src="${product.image}" alt="${product.nameProduct}" class="w-full h-48 object-cover rounded-md mb-4">
        <h2 class="text-lg font-semibold">${product.nameProduct}</h2>
        <p class="text-gray-500">${product.trademark}</p>
        <p class="text-red-500 font-bold">${product.price} VND</p>
      </div>
    `)
        .join("");
    const listProduct = document.getElementById("list-products");
    if (listProduct) {
        listProduct.innerHTML = str;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts2();
});
