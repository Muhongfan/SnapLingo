import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../../utils/utils";

import "./Main.scss";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import framesxTheme from "../../theme";

import ControlledCarousel from '../../components/controlledCarousel/controlledCarousel';

function Main() {
  const [recordsData, setRecordsData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchRecentRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/records`);
      setRecordsData(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching recent records:', error);
    }
  };

  useEffect(() => {
    fetchRecentRecords();
  }, []);

  if (isFetching) {
    return <p>Loading Recent Records...</p>;
  }
  // console.log(recordsData); // or display an error message

  // const dataArray = Object.values(recordsData);

  return (
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme} style={{ width: '100%' }}>
      <CssBaseline />
      <div className="main">
        <div className="main__wrapper">
          <h2 className="main__title ">Recent images</h2>
          <div className='main__card-container'>
          <ControlledCarousel images={recordsData} />
          </div>
        </div>
      </div>
    </CssVarsProvider>
  );
}

export default Main;
