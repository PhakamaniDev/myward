import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { CredentialContext } from '../context/Context';

const List = ({wardsByProvince,province}) => {
    const { setWardCode } = useContext(CredentialContext);
    const handleClick = (data) => {
        setWardCode(data);
      };
  return (
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
  )
}

export default List