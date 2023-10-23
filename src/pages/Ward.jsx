import React, { useContext, useEffect, useState } from "react";
import { CredentialContext } from "../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { DotSpinner } from "@uiball/loaders";

const Ward = () => {
  const { wardCode } = useContext(CredentialContext);
  const [ward, setWard] = useState(null);
  console.log("code", wardCode);
  const styles = {
    height: 50,
    width: 100,
    background: "blue",
    color: "white",
    marginTop: 100,
    padding: "10px 50px",
    display: "flex",
    borderRadius: 20,
    fontSize: "700",
    justifyContent:'center',
    alignItems:'center'
  };
  const getWard = async () => {
    await axios
      .get(`https://vd-change-api.da-io.net/ward/${wardCode}`)
      .then((response) => {
        setWard(response.data);
        console.log(response.data.changes);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const Type = (type) => {
    console.log("my type", type);
    switch (type.type) {
      case "vd_created":
        return `voting district (${type?.vd_name}) (${type?.vd_code}) created.`;
      case "vd_deleted":
        return `Former voting district (${type?.vd_name}) (${type?.vd_code}) deleted.`;
      case "boundary_change":
        return `Area reassigned from
       (${type?.from.vd_name}) (${type?.from.vd_code}) to (${type?.to.vd_name}) (${type?.to.vd_code}).`;
      default:
        return `voting district`;
    }
  };

  useEffect(() => {
    getWard();
  }, []);
  return (
    <div className="container ">
      <Link style={styles} to="/">
        Back
      </Link>
      <h1 className=" mt-5">{ward && ward.municipality}</h1>
      {ward ? (
        ward?.changes.map((change, i) => {
          return (
            <div key={i}>
              <p>{Type(change)}</p>
            </div>
          );
        })
      ) : (
        <div
          style={{ height: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          <DotSpinner size={100} speed={1} color="blue" />
        </div>
      )}
    </div>
  );
};

export default Ward;
