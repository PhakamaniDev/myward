import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CredentialContext } from '../context/Context';
import { DotSpinner } from '@uiball/loaders'

const Home = () => {
  const { setWardCode, wardCode } = useContext(CredentialContext);
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

  const handleClick = (data) => {
    setWardCode(data);
  };

  return (
    <div className='container mt-5'>
      <h1>LIST OF ALL AFFECTED WARDS</h1>
      <div className='row'>
        {!loading ? provinces.map((province) => (
          <div className='col-md-4' key={province}>
            <div className=''>
              <div className='card-body'>
                <h2 className='card-title'>{province}</h2>
                <ul >
                  {wardsByProvince[province].map((ward) => (
                    <li key={ward.id} className=''>
                      <Link to="/ward" onClick={() => handleClick(ward.ward_code)}>
                        {ward.municipality} {ward.ward_number}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )) :      <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <DotSpinner size={100} speed={1} color="blue" />
        </div>}
      </div>
    </div>
  );
};

export default Home;
