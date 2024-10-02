const API = "./daily.json";
const center = document.getElementById("center");
let i = 0;
let data = 0;

async function fetchapi() {
    try {
        const response = await fetch(API);
        data = await response.json();
        // console.log(data);
        displayData(data);
    } catch (err) {
        console.log("Something went wrong", err)
    }

};
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


fetchapi();
function displayData(data) {
    // console.log(data)
    // console.log(i)
    const table = `
    <a class="link" href="./bp.html">Download SA1 Blueprints Here!</a>
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
        <a class="link" href="./hw.html">Today's Homework & Next Exam Syllabus</a>
        `;
        center.innerHTML = table;
}

self.addEventListener('install', function(event) {
    // Perform install steps
    var CACHE_NAME = '12-B/D Time Table';
    var urlsToCache = [
        '/',
        '/style.css',
        '/script.js',
        '/script1.js',
        '/daily.json'
    ];

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});