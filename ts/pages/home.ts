function home() {
    let str = `
        <div id="hero"></div>
        <div id="cart-items" class="w-5/6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-items-center"></div>
    `
    return str;
}

document.addEventListener("DOMContentLoaded", () => {
    const homeRender = document.querySelector("#home");
    if (homeRender) {
        homeRender.innerHTML = home();
    }
});