const API = "./daily.json";
const center = document.getElementById("center");
let i = 0;
let data = 0;


async function fetchapi() {
    try {
        const response = await fetch(API);
        data = await response.json();
        console.log(data);
        displayData(data);
    } catch (err) {
        console.log("Something went wrong", err)
    }

}


function prevhw() {
    if (i+1<data.length) {
        i = i + 1;
        
        fetchapi();
    }
}
function nexthw() {
    if (i>0) {
        i = i - 1;
        
        fetchapi();
    }
}

fetchapi();
function displayData(data) {
        console.log(data)
        
    console.log(i)
        const hw = `
        <h1>HOMEWORK</h1>
       <h2>${data[i].hwdate}</h2>
        <p>${data[i].hw1}</p>
        <p>${data[i].hw2}</p>
        <p>${data[i].hw3}</p>
        <br>
        <br>
        <br>
        <br>
        <h1>NEXT EXAM</h1>
       <h2>${data[i].edate}</h2>
        <p>${data[i].sub}: <br/>
  CHAPTER: ${data[i].ch}</p>
            <a class="link" href="./index.html">Tomorrow's Time Table</a>
        `;
        center.innerHTML = hw;
}