// js/modules/filter.js

export function initDirectoryFilter() {
    const filterSelect = document.getElementById('category');
    const cards = document.querySelectorAll('.directory-card');

    filterSelect?.addEventListener('change', (e) => {
        const value = e.target.value;
        cards.forEach(card => {
            if (value === 'all' || card.dataset.category === value) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
