import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFatching, setIsFatching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFatching(true);

      try {
       const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.longitude,
            position.coords.latitude,
          );
          setAvailablePlaces(sortedPlaces);
          setIsFatching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fatch Places, Please try again letter",
        });
        setIsFatching(false);
      }

      
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title={"An error occored!"} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFatching}
      loadingText="Fatching place data...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
