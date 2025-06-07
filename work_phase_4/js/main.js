// js/main.js

import { initNavHighlight } from "./modules/nav.js";
import { initDirectoryFilter } from "./modules/filter.js";
import { initContactForm } from "./modules/form.js";

// 全局初始化
document.addEventListener("DOMContentLoaded", () => {
    initNavHighlight();

    // 针对不同页面按需加载
    if (document.body.contains(document.querySelector(".directory-list"))) {
        initDirectoryFilter();
    }
    if (document.body.contains(document.querySelector(".contact-form"))) {
        initContactForm();
    }
    // 以后如果加其他页面，也可以在这里判断并加载
});
// 社区目录筛选功能
document.addEventListener("DOMContentLoaded", function () {
    const filter = document.getElementById("category");
    const cards = document.querySelectorAll(
        ".directory-list .card, .highlight-grid .card, section .card"
    );

    filter.addEventListener("change", function () {
        const value = filter.value;
        cards.forEach((card) => {
            if (value === "all" || card.dataset.category === value) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});
// 放到js/main.js或js/contact.js里
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const status = document.getElementById("form-status");
        status.innerHTML = "";
        // 收集数据
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
        };

        // 简单校验
        if (!data.name || !data.email || !data.message) {
            status.innerHTML =
                '<div class="form-error">Please fill in all fields.</div>';
            return;
        }

        try {
            // 修改下面两项为你的真实学号和zone id
            const studentNumber = "s4893955"; // 改为你自己的
            const uqcloudZoneId = "cd947b62"; // 改为你自己的

            const response = await fetch(
                "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        student_number: studentNumber,
                        uqcloud_zone_id: uqcloudZoneId,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                status.innerHTML =
                    '<div class="form-success">Thank you! Your message has been received.</div>';
                form.reset();
            } else {
                status.innerHTML =
                    '<div class="form-error">Sorry, something went wrong. Please try again later.</div>';
            }
        } catch (err) {
            status.innerHTML =
                '<div class="form-error">Could not connect to the server.</div>';
        }
    });
});
