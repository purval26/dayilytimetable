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
        const hw = `
        <h1>HOMEWORK</h1>
        <h2>${data[0].date}</h2>
        <p>${data[0].hw1}</p>
        <p>${data[0].hw2}</p>
        <p>${data[0].hw3}</p>
        <br>
        <br>
        <br>
        <br>
        <h1>NEXT EXAM</h1>
        <h2>${data[0].edate}</h2>
        <p>${data[0].sub}: <br/>
            CHAPTER: ${data[0].ch}</p>
            <a class="link" href="./index.html">Today's Time Table</a>
        `;
        center.insertAdjacentHTML("beforeend", hw);
}