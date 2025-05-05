
function initAccordion(containerSelector) {
    const accordions = document.querySelectorAll(containerSelector);

    accordions.forEach((container) => {
        const headers = container.querySelectorAll(".accordion-header");

        headers.forEach((header) => {
            // 防止重复绑定
            if (!header.dataset.bound) {
                header.addEventListener("click", () => {
                    const item = header.parentElement;
                    item.classList.toggle("open");

                    // 递归绑定嵌套手风琴
                    const nested = item.querySelectorAll(".accordion");
                    nested.forEach((nestedContainer) => {
                        initAccordionFromContainer(nestedContainer);
                    });
                });
                header.dataset.bound = "true";
            }
        });
    });
}

function initAccordionFromContainer(container) {
    const headers = container.querySelectorAll(".accordion-header");

    headers.forEach((header) => {
        if (!header.dataset.bound) {
            header.addEventListener("click", () => {
                const item = header.parentElement;
                item.classList.toggle("open");

                const nested = item.querySelectorAll(".accordion");
                nested.forEach((nestedContainer) => {
                    initAccordionFromContainer(nestedContainer);
                });
            });
            header.dataset.bound = "true";
        }
    });
}

export { initAccordion };
