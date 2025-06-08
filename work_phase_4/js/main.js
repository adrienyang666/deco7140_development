// js/main.js

import { initNavHighlight } from "./modules/nav.js";
import { initDirectoryFilter } from "./modules/filter.js";
// 你可以把Contact的API提交也写成模块放modules/form.js，这里为了方便合并演示

// 全局初始化
document.addEventListener("DOMContentLoaded", () => {
    initNavHighlight();

    // 针对不同页面按需加载
    if (document.body.contains(document.querySelector(".directory-list"))) {
        initDirectoryFilter();
    }

    // Contact表单API提交
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const status = document.getElementById("form-status");
            status.innerHTML = "";
            const data = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                message: form.message.value.trim(),
            };
            if (!data.name || !data.email || !data.message) {
                status.innerHTML =
                    '<div class="form-error">Please fill in all fields.</div>';
                return;
            }
            try {
                const studentNumber = "s4893955"; // 你的真实学号
                const uqcloudZoneId = "cd947b62"; // 你的真实zone id

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
                const resData = await response.json();
                const isSuccess = response.ok || resData.status === "success";

                if (isSuccess) {
                    status.innerHTML =
                        '<div class="form-success">Thank you! Your message has been received.</div>';
                    form.reset();
                } else if (
                    resData.message ===
                    "This email has already joined the community."
                ) {
                    status.innerHTML =
                        '<div class="form-error">This email has already joined the community. Please use another email.</div>';
                } else {
                    status.innerHTML =
                        '<div class="form-error">Sorry, something went wrong. Please try again later.</div>';
                }
            } catch (err) {
                status.innerHTML =
                    '<div class="form-error">Could not connect to the server.</div>';
            }
        });
    }

    // 目录筛选功能 (如果只在某页需要，可合并到filter.js)
    const filter = document.getElementById("category");
    if (filter) {
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
    }
});
