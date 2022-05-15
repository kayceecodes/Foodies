import Map, { Marker, Popup } from "react-map-gl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { increment } from "../src/store/actions/actionCreators/increment";
import styles from "../styles/Home.module.css";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({}));

interface Business {
  name: string;
  imgUrl: string;
  isClosed: boolean;
  url: string;
  // categories: Categories,
  rating: number;
  // coordinates: Coordinates,
  price: string;
  // zipcode:
}

const usersLocation = 19019;
const initialRadius = 40000;

function Home(props: any) {
  const [popup, setPopupStatus] = useState("hide");
  const [restaurants, setRestaurants] = useState<any[]>();
  const [state, setState] = useState({
    lat: 39.9526,
    lng: -75.1652,
    location: 19019,
    radius: 40000,
  });
  const classes = useStyles();
  const url = `https://localhost:7292/api/business?location=19801&radius=40000`;
  useEffect(() => {
    let data = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: ""
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data)
        console.log("Success - data object: ", data);
      })
      .catch((err) => {
        console.log("error, get businesses: ", err);
      });
  });

  const dispatch: Dispatch<any> = useDispatch();
  enum Status {
    hide = "hide",
    show = "show",
  }

  return (
    <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Map
        initialViewState={{
          longitude: state.lng,
          latitude: state.lat,
          zoom: 10,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        // mapStyle="mapbox://styles/mapbox/streets-v11"
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      >
        {/* {restaurants.map((property: any, index) => (
          <div key={property.id}>
            <Marker latitude={property.latitude} longitude={property.longitude}>
              <button
                onMouseOver={() => {
                  setPopupStatus(Status.show)
                  dispatch(selectProperty(property))
                }}
                onClick={(e: any) => {
                  e.preventDefault()
                  setOpen(true)
                  dispatch(selectProperty(property))
                }}
              >
                <Image
                  src="/assets/images/markers/pin.svg"
                  width={35}
                  height={35}
                />
                <br />
                <Paper>
                  <small>{trimNumber(property.price)}</small>
                </Paper>
              </button>
            </Marker>
          </div>
        ))}
        {popup === Status.show && (
          <Popups
            setPopupStatus={setPopupStatus}
            Status={Status}
            selectedProperty={selectedProperty}
          />
        )}
          */}
      </Map>
    </Box>
  );
}

export default Home;
