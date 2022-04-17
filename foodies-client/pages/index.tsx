
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useReducer, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { increment } from '../src/store/actions/actionCreators/increment'
import styles from '../styles/Home.module.css'
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles((theme) => ({
  backgroundClass: {

    
  }
}));

function Home() {  
  const [popup, setPopupStatus] = useState('hide')
  const [restaurants, getRestaurants] = useState()
  const [values, setValues] = useState({
    lat: 39.9526,
    lng: 75.1652,
    zipcode: 19019,
    radius: 15000,
  })
  const classes = useStyles();
  const url = "https://api.yelp.com/v3/businesses/search?"

  useEffect(() => {
    fetch(`zipcode=${values.zipcode}&radius=${values.radius}`, 
    {
      method: 'POST', // or 'PUT'
      headers: {
        'X-API-KEY': process.env.YELP_API_KEY as string,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res.json())      
    })
    .catch((err) => {
      console.log('Error Message: ', err)
    })

  })

  const dispatch: Dispatch<any> = useDispatch()
  enum Status {
    hide = 'hide',
    show = 'show',
  }

  return (
    <Box sx={{width: '100%', height: '100vh', overflow: 'hidden'}}>
      <div className={classes.backgroundClass}>
        Here is something random!
      </div>
      <ReactMapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* {properties.map((property: Property, index) => (
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
        )} */}
      </ReactMapGL>
    </Box>
  )
}

export default Home
