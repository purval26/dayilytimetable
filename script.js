const API = "./daily.json";
const center = document.getElementById("center");

async function fetchapi() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data);
        displayData(data);
    } catch (err) {
        console.log("Something went wrong", err)
    }

}

fetchapi();
function displayData(data) {
        console.log(data)
        const table = `
        <table>
         <tr><th class="date">${data[0].date}</th></tr>
            <tr><td class="1">${data[0].lec1}</td></tr>
            <tr><td class="2">${data[0].lec2}</td></tr>
            <tr><td class="3">${data[0].lec3}</td></tr>
            <tr><td class="4">${data[0].lec4}</td></tr>
            <tr><td class="5">${data[0].lec5}</td></tr>
            <tr><td class="6">${data[0].lec6}</td></tr>
            <tr><td class="7">${data[0].lec7}</td></tr>
        </table>
        <a class="link" href="./hw.html">Today's Homework & Next Exam Syllabus</a>
        `;
        center.insertAdjacentHTML("beforeend", table);
}