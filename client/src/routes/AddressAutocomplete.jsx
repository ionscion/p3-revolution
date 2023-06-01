import React, { useRef } from 'react';

function AddressAutocomplete() {
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const selectedPlace = autocompleteRef.current.getPlace();
    // Access the selected place object and extract the desired information
    // For example, you can access the formatted address as selectedPlace.formatted_address
    // and update your state or perform any necessary actions.
    console.log(selectedPlace);
  };

  const loadGooglePlaces = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);
      autocomplete.setFields(['formatted_address', 'geometry']);
      autocomplete.addListener('place_changed', handlePlaceSelect);
    };
    document.body.appendChild(script);
  };

  // Load the Google Places API on component mount
  React.useEffect(() => {
    loadGooglePlaces();
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={autocompleteRef}
        placeholder="Enter your address"
      />
    </div>
  );
}

export default AddressAutocomplete;
