import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { DotSpinner } from '@uiball/loaders'
import List from '../components/List'

const Home = () => {

  const [loading,setLoading]  = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [wardsByProvince, setWardsByProvince] = useState({});

  const getProvinces = () => {
    axios.get('https://vd-change-api.da-io.net/wards').then((response) => {
      // Organize wards by province
      setLoading(false)
      const wardsGroupedByProvince = {};
      response.data.forEach((ward) => {
        const provinceName = ward.province;
        if (!wardsGroupedByProvince[provinceName]) {
          wardsGroupedByProvince[provinceName] = [];
        }
        wardsGroupedByProvince[provinceName].push(ward);
      });

      // Update state with provinces and grouped wards
      setProvinces(Object.keys(wardsGroupedByProvince));
      setWardsByProvince(wardsGroupedByProvince);
    });
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <div className='container mt-5'>
      <h1 className='mb-5 mt-5'>LIST OF ALL AFFECTED WARDS</h1>

      <div className='row'>
        {!loading ? provinces.map((province,i) => (
            <List
                key={i}
                wardsByProvince={wardsByProvince}
                province={province}
            />
        )) :
        <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
            <DotSpinner size={100} speed={1} color="blue" />
        </div>}
      </div>
    </div>
  );
};

export default Home;
