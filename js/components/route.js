function handleRoute(pageName) {
    const contentDiv = document.querySelector('#home');
    contentDiv.innerHTML = '';
    switch (pageName) {
        case 'home':
            contentDiv.innerHTML = home();
            break;
        case 'products':
            contentDiv.innerHTML = ProductPage();
            break;
        default:
            contentDiv.innerHTML = home();
    }
}
function setupNavigation() {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const pageName = href.replace('/', '') || 'home';
            window.history.pushState({}, '', href);
            handleRoute(pageName);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const navbarRender = document.querySelector("#navbar");
    if (navbarRender) {
        navbarRender.innerHTML = navbar();
        setupNavigation();
    }
    const path = window.location.pathname;
    const pageName = path.replace('/', '') || 'home';
    handleRoute(pageName);
});
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
