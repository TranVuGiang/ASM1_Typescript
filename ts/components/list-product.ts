const URL_API = "http://localhost:3000/";
interface Product {
  id: string;
  nameProduct: string;
  price: string;
  trademark: string;
  image: string;
}
async function fetchProducts() {
  try {
    const response = await fetch(URL_API + "list-product-home");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const products: Product[] = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products: Product[]) {
  const str = products
    .map(
      (product) => `
      <div class="border p-4 rounded-lg shadow-lg cursor-pointer">
        <img src="${product.image}" alt="${product.nameProduct}" class="w-full h-48 object-cover rounded-md mb-4">
        <h2 class="text-lg font-semibold">${product.nameProduct}</h2>
        <p class="text-gray-500">${product.trademark}</p>
        <p class="text-red-500 font-bold">${product.price} VND</p>
      </div>
    `
    )
    .join(""); 
  const listProduct = document.getElementById("cart-items"); 
  if (listProduct) {
    listProduct.innerHTML = str; 
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts(); // Gọi fetch API khi DOM đã sẵn sàng
});
