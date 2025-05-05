// ✅ Imports
import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

// ✅ Constants
const API_POST_URL =
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/";
const API_GET_URL =
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/";
const HEADERS = {
    student_number: "s4893955", // 🔁 替换为你真实学号
    uqcloud_zone_id: "cd947b62", // 🔁 替换为你的 uqcloud ID
};

// ✅ Main logic
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("community-form");
    const feedback = document.getElementById("form-feedback");
    const listContainer = document.getElementById("community-list");

    // 📝 Handle form submission
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            feedback.textContent = "Submitting...";

            const { success, data } = await postFormData(
                form,
                API_POST_URL,
                HEADERS
            );

            if (success) {
                feedback.textContent = data.message;
                feedback.style.color = "green";
                form.reset();
                loadCommunityList(); // Refresh list after join
            } else {
                feedback.textContent = data.message || "Something went wrong.";
                feedback.style.color = "red";
            }
        });
    }

    // 🧾 Load community members
    function loadCommunityList() {
        if (!listContainer) return;

        fetchGetData(API_GET_URL, HEADERS).then((data) => {
            if (!data || data.length === 0) {
                listContainer.innerHTML =
                    '<p class="text-danger">No members yet.</p>';
                return;
            }

            listContainer.innerHTML = ""; // Clear old entries
            data.forEach((member) => {
                const card = document.createElement("div");
                card.className = "card mb-3";
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${member.name}</h5>
                        <p class="card-text">${
                            member.message || "No message provided."
                        }</p>
                    </div>
                `;
                listContainer.appendChild(card);
            });
        });
    }

    // 🔄 Initial load
    loadCommunityList();
});
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true" || false;
        button.setAttribute("aria-expanded", !expanded);
        navLinks.classList.toggle("show");
    });
});
