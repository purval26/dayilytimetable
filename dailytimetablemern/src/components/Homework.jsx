import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Homework = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch('/daily.json');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);
  
  const nextHomework = () => {
    if (index > 0) {
      setIndex(index - 1);
      // console.log(index);
      // fetchData();
    }
  };
  
  const prevHomework = () => {
    if (index + 1 < data.length) {
      setIndex(index + 1);
      // console.log(index);
      // fetchData();
    }
  };

  return (
    <div className='table'>
      <button className="nepe l" onClick={prevHomework}><i className="fas fa-arrow-left left"></i></button>
    <div id="center">
      {data.length > 0 && (
        <>
          <h1>HOMEWORK</h1>
          <h2>{data[index].hwdate}</h2>
          <p>{data[index].hw1}</p>
          <p>{data[index].hw2}</p>
          <p>{data[index].hw3}</p>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1>NEXT EXAM</h1>
          <h2>{data[index].edate}</h2>
          <p>{data[index].sub}: <br /> CHAPTER: {data[index].ch}</p>
          <br/>
      <Link className='link' to={"/"}>Tomorrow's Time Table</Link>
        </>
      )}
    </div>
      <button className="nepe r" onClick={nextHomework}><i className="fas fa-arrow-right right"></i></button>
  </div>
  );
};

export default Homework;