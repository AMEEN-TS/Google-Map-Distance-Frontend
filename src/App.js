

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BaseUrl } from "./API/BaseUrl";
import imge1 from "./image/WF-group-logo-03-1-400x171.png";
import { FallingLines } from 'react-loader-spinner'
import { TbCircleDot } from "react-icons/tb";
import { BsFillGeoAltFill } from "react-icons/bs";
import Autocomplete from "react-google-autocomplete";


function Distance() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distance, setDistance] = useState("");
  const [map, setMap] = useState("");
  const [spinner,setSpinner]=useState()


  const handleSubmit = async (event) => {
    setSpinner(true)
    event.preventDefault();
    const response = await axios.get(`${BaseUrl}/api/distance`, { params: { from, to } });
    setDistance(response.data.distance);
    setMap(response.data.mapUrl)
    loading();
  };

  function loading(){
    setTimeout(()=>{
      setSpinner(false)
    },3000)
  }


  return (
    <div style={{ width: "100%", }}>
      <div className='navbar'>
        <img src={imge1} ></img>

      </div>
      <div className='heading'>
        <h1>Discover the Distance Between Two Locations.</h1>
        <p>This App Will Help You Calculate Your Travelling Distances.</p>
      </div>
      <div className='main'>
        <form onSubmit={handleSubmit} className="form" >
          <div className='form-body'>
            <label >
              <span> <TbCircleDot /></span>

              <Autocomplete
  apiKey={process.env.REACT_APP_MAP_KEY}

  onPlaceSelected={(place) => {
    setFrom(place.address_components[0].long_name
        )
  }}
/>
            </label>
            <label >
              <span><BsFillGeoAltFill /></span>
              <Autocomplete
  apiKey={process.env.REACT_APP_MAP_KEY}

  onPlaceSelected={(place) => {
    setTo(place.address_components[0].long_name
        )
  }}
/>
            </label>
            <button type="submit">Go</button>

          </div>

        </form>
      </div>
      <div className='loader'>
      {spinner &&(
      <FallingLines
      color="#ffb400"
      width="100"
      visible={true}
      ariaLabel='falling-lines-loading'
    />
      )}
      </div>
    
      
      {distance && (
        <div className='map' >
          <h1>Distance: {distance} </h1>
          <iframe
            width="90%"
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

