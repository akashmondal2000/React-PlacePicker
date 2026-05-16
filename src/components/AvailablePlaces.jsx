import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFatching,setIsFatching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {

    async function fetchPlaces(){
      setIsFatching(true)
      const responce = await fetch("http://localhost:3000/places");
      const resData = await responce.json();
      setAvailablePlaces(resData.places);
      setIsFatching(false)
    }

    fetchPlaces()
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFatching}
      loadingText = "Fatching place data...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
