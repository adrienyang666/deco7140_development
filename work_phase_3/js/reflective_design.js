import { fetchGetData } from "./modules/getData.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("community-list");

    fetchGetData(
        "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/",
        {
            student_number: "s4893955",
            uqcloud_zone_id: "cd947b62",
        }
    ).then((data) => {
        if (!data) {
            container.innerHTML = "<p>Unable to load community content.</p>";
            return;
        }

        data.forEach((entry) => {
            const card = document.createElement("div");
            card.className = "card mb-3";
            card.innerHTML = `
        <div class="card-body">
          <h3>${entry.name}</h3>
          <p>${entry.message || "No message provided."}</p>
          ${
              entry.photo
                  ? `<img src="${entry.photo}" alt="${entry.name}'s photo" style="max-width:100%;"/>`
                  : ""
          }
        </div>
      `;
            container.appendChild(card);
        });
    });
});
