import dotenv from 'dotenv';
import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const { APIKEY } = process.env;

 
const AddressAutocomplete = () => {
  
 
  function onPlaceSelect(value) {
    console.log(value);
  }
 
  function onSuggectionChange(value) {
    console.log(value);
  }
 
  return <GeoapifyContext apiKey= {APIKEY}>
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        type={postcode}
        lang={en}
        position={position}
        countryCodes={countryCodes}
        limit={5}
        value={displayValue}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        />
    </GeoapifyContext>
}
 



export default AddressAutocomplete;
