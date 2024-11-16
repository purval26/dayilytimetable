let API = "./daily.json";
const center = document.getElementById("center");
const opt = document.getElementById("opt");
let i = 0;
let data = 0;
const selectElement = document.getElementById("options");
// selectElement.addEventListener("change", () => {
//     opt.style.display = "none";
//   });

async function fetchapi() {
    try {
        const response = await fetch(API);
        data = await response.json();
        displayData(data); // This will update the display with new data
        links();
    } catch (err) {
        console.log("Something went wrong", err);
    }
}

const savedOption = localStorage.getItem("selectedOption");
window.onload = () => {
    if (savedOption != null) {
        selectElement.value = savedOption; // Set the select element to the saved option
        opt.style.display = "none";
        changeapi(); // Fetch and display data based on the saved option
        // links();
    } else {
        // Optionally set a default value if no option is saved
        // selectElement.value = "b"; // Example of setting a default option
        changeapi(); // Fetch data for the default option
    }
};

function changeapi() {
    if (selectElement.value === "b") {
        API = "./daily.json";
    } else if (selectElement.value === "j") {
        API = "./dailyj.json";
    }
    fetchapi(); // Fetch new data based on the selected option
    // links();
}

selectElement.addEventListener("change", () => {
    localStorage.setItem("selectedOption", selectElement.value);
    changeapi(); // Fetch and display new data
    opt.style.display = "none";
});

function prevtable() {
    if (i+1<data.length) {
        i = i + 1;
        
        fetchapi();
    }
}
function nexttable() {
    if (i>0) {
        i = i - 1;
        
        fetchapi();
    }
}


// fetchapi();
changeapi();
function displayData(data) {
    // console.log(data)
    // console.log(i)
    const table = `
    <table>
    <tr><th class="date">${data[i].date}</th></tr>
    <tr><td class="1">${data[i].lec1}</td></tr>
    <tr><td class="2">${data[i].lec2}</td></tr>
    <tr><td class="3">${data[i].lec3}</td></tr>
    <tr><td class="4">${data[i].lec4}</td></tr>
    <tr><td class="5">${data[i].lec5}</td></tr>
    <tr><td class="6">${data[i].lec6}</td></tr>
    <tr><td class="7">${data[i].lec7}</td></tr>
    </table>
    <a class="link link1" id="link1" href="./hw.html">Today's Homework & Next Exam Syllabus</a>
    <a class="link" id="link2" href="./bp.html" style="display: none;">Download SA1 Blueprints Here!</a>
    `;
    center.innerHTML = table;
};
async function links() {
    const link = document.querySelector(".link1");
    console.log("Link Element:", link); // Check if the link is found
    console.log("Select Element Value:", selectElement.value); // Check the value of the select element

    if (selectElement.value === "j") {
        if (link) {
            link.classList.add("hide"); // Add the hide class to hide the link
            console.log("Link hidden");
        } else {
            console.log("Link not found");
        }
    }
}
// links();
self.addEventListener('install', function(event) {
    // Perform install steps
    var CACHE_NAME = '12-B/D Time Table';
    var urlsToCache = [
        '/',
        '/style.css',
        '/script.js',
        '/script1.js',
        '/daily.json',
        './hw.html',
        './bp.html'
    ];

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});