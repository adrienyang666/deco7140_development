// js/modules/nav.js

export function initNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-list a');
    const path = window.location.pathname;
    navLinks.forEach(link => {
        // 只用文件名判断，简化处理
        if (path.endsWith(link.getAttribute('href'))) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        } else {
            link.removeAttribute('aria-current');
            link.classList.remove('active');
        }
    });
}
