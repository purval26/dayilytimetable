import React, { useEffect, useState } from 'react';
import "../assets/daily.json"
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
  try {
    const response = await fetch('/daily.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Parse the JSON response
    setData(result); // Set the data into state
    // checkdata()
  } catch (error) {
    console.error("Something went wrong", error);
  }
};
const checkdata = () => {
  // Check if `data` is an array and contains items
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Data is empty or not an array.");
    return; // Exit early if data is empty or invalid
  }

  // Check if `index` is valid and within the bounds of the data array
  if (index < 0 || index >= data.length) {
    console.error("Index is out of bounds.");
    return; // Exit early if index is out of bounds
  }

  // Now we can safely access data[index]
  const lect1 = document.querySelector(".lect1");
  const lect2 = document.querySelector(".lect2");
  const lect3 = document.querySelector(".lect3");
  const lect4 = document.querySelector(".lect4");
  const lect5 = document.querySelector(".lect5");
  const lect6 = document.querySelector(".lect6");
  const lect7 = document.querySelector(".lect7");

  // Check each lecture and add/remove the "hide" class
const lectures = [lect1, lect2, lect3, lect4, lect5, lect6, lect7];
const lecData = [data[index].lec1, data[index].lec2, data[index].lec3, data[index].lec4, data[index].lec5, data[index].lec6, data[index].lec7];

lecData.map((lec, i) => {
  if (lec === "") {
    lectures[i].classList.add("hide");
  } else {
    lectures[i].classList.remove("hide");
  }
});
};


useEffect(() => {
    checkdata()
}, [data,index]);  // Dependencies are `data` and `index`

useEffect(() => {
    fetchData();
    // checkdata()
  }, []);

  const nextTable = () => {
      if (index > 0) {
          setIndex(index - 1);
        //   checkdata()
        }
    };
    
    const prevTable = () => {
        if (index + 1 < data.length) {
            setIndex(index + 1);
            // checkdata()
        }
  };

  return (
    <div className="table">
  <button className="nepe l" onClick={prevTable}><i className="fas fa-arrow-left left"></i></button>
  <div id="center">
    {data.length > 0 && (
      <table>
        <thead>
          <tr>
            <th className="date">{data[index].date}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="lect1">{data[index].lec1}</td></tr>
          <tr><td className="lect2">{data[index].lec2}</td></tr>
          <tr><td className="lect3">{data[index].lec3}</td></tr>
          <tr><td className="lect4">{data[index].lec4}</td></tr>
          <tr><td className="lect5">{data[index].lec5}</td></tr>
          <tr><td className="lect6">{data[index].lec6}</td></tr>
          <tr><td className="lect7">{data[index].lec7}</td></tr>
        </tbody>
      </table>
    )}
    <Link className='link link1' id='link1' to={"/homework"}>Today's Homework & Next Exam Syllabus</Link>
  </div>
  <button className="nepe r" onClick={nextTable}><i className="fas fa-arrow-right right"></i></button>
</div>

  );
};

export default Home;