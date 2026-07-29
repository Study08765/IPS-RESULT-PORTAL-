// ===============================
// THE STUDY POINT Dashboard V3
// ===============================

// Live Date & Time
function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const date = now.toLocaleDateString("en-IN", options);
    const time = now.toLocaleTimeString("en-IN");

    const el = document.getElementById("liveDate");

    if (el) {
        el.innerHTML = `${date}<br>${time}`;
    }
}

setInterval(updateDateTime, 1000);
updateDateTime();


// Counter Animation
function counter(id, target) {

    let count = 0;

    const speed = Math.max(1, Math.ceil(target / 80));

    const timer = setInterval(() => {

        count += speed;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        document.getElementById(id).innerHTML = count;

    }, 20);

}

window.onload = function () {

    counter("studentCount", 500);

    counter("testCount", 32);

    counter("paperCount", 125);

    counter("resultCount", 18);

};


// Search Dashboard Cards
const search = document.querySelector(".search-box input");

if (search) {

    search.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let cards = document.querySelectorAll(".dashboard-card");

        cards.forEach(card => {

            let text = card.innerText.toLowerCase();

            card.style.display = text.includes(value) ? "block" : "none";

        });

    });

}


// Logout
function logout() {

    if (confirm("Are you sure you want to logout?")) {

        window.location.href = "index.html";

    }

                           }
