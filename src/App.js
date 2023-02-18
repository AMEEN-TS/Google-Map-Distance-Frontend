

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BaseUrl } from "./API/BaseUrl";
import imge1 from "./image/WF-group-logo-03-1-400x171.png";
import { TbCircleDot } from "react-icons/tb";
import { BsFillGeoAltFill } from "react-icons/bs";


function Distance() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distance, setDistance] = useState("");
  const [map, setMap] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`${BaseUrl}/api/distance`, { params: { from, to } });
    setDistance(response.data.distance);
    setMap(response.data.mapUrl)

  };

  return (
    <div style={{ width: "100%" }}>
      <div className='navbar'>
        <img src={imge1} ></img>

      </div>
      <div className='heading'>
        <h1>Find The Distance Between Two Places.</h1>
        <p>This App Will Help You Calculate Your Travelling Distances.</p>
      </div>
      <div className='main'>
        <form onSubmit={handleSubmit} className="form" >
          <div className='form-body'>
            <label >
              <span> <TbCircleDot /></span>

              <input type="text" value={from} onChange={(event) => setFrom(event.target.value)} />
            </label>
            <label >
              <span><BsFillGeoAltFill /></span>
              <input type="text" value={to} onChange={(event) => setTo(event.target.value)} />
            </label>
            <button type="submit">Go</button>

          </div>

        </form>
      </div>
      {distance && (
        <div className='map' >
          <h1>Distance: {distance} </h1>
          <iframe
            width="60%"
            height="450"
            frameBorder="0"
            src={map}
            allowFullScreen
          ></iframe>
        </div>
      )}

    </div>

  );
}

export default Distance;
