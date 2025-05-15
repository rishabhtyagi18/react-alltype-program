import React, { useState, useEffect, useRef } from "react";

export default function UberLikeApp() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const pickupAutocomplete = useRef(null);
  const dropoffAutocomplete = useRef(null);

  // Initialize Google Map + Autocomplete
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        script.onerror = () => setError("Google Maps API failed to load");
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
      });
      directionsService.current = new google.maps.DirectionsService();
      directionsRenderer.current = new google.maps.DirectionsRenderer({
        map: mapInstance.current,
      });

      // Autocomplete for pickup
      pickupAutocomplete.current = new google.maps.places.Autocomplete(
        document.getElementById("pickup")
      );
      pickupAutocomplete.current.setFields(["geometry", "formatted_address"]);
      pickupAutocomplete.current.addListener("place_changed", () => {
        const place = pickupAutocomplete.current.getPlace();
        if (!place.geometry) {
          setError("Invalid pickup location");
          return;
        }
        setPickup(place.formatted_address);
        setPickupCoords(place.geometry.location.toJSON());
      });

      // Autocomplete for dropoff
      dropoffAutocomplete.current = new google.maps.places.Autocomplete(
        document.getElementById("dropoff")
      );
      dropoffAutocomplete.current.setFields(["geometry", "formatted_address"]);
      dropoffAutocomplete.current.addListener("place_changed", () => {
        const place = dropoffAutocomplete.current.getPlace();
        if (!place.geometry) {
          setError("Invalid dropoff location");
          return;
        }
        setDropoff(place.formatted_address);
        setDropoffCoords(place.geometry.location.toJSON());
      });
    };

    loadGoogleMapsAPI();

    // Autocomplete for pickup
    pickupAutocomplete.current = new google.maps.places.Autocomplete(
      document.getElementById("pickup")
    );
    pickupAutocomplete.current.setFields(["geometry", "formatted_address"]);
    pickupAutocomplete.current.addListener("place_changed", () => {
      const place = pickupAutocomplete.current.getPlace();
      if (!place.geometry) {
        setError("Invalid pickup location");
        return;
      }
      setPickup(place.formatted_address);
      setPickupCoords(place.geometry.location.toJSON());
    });

    // Autocomplete for dropoff
    dropoffAutocomplete.current = new google.maps.places.Autocomplete(
      document.getElementById("dropoff")
    );
    dropoffAutocomplete.current.setFields(["geometry", "formatted_address"]);
    dropoffAutocomplete.current.addListener("place_changed", () => {
      const place = dropoffAutocomplete.current.getPlace();
      if (!place.geometry) {
        setError("Invalid dropoff location");
        return;
      }
      setDropoff(place.formatted_address);
      setDropoffCoords(place.geometry.location.toJSON());
    });
  }, []);

  // Calculate route on coords
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      setLoadingRoute(true);
      directionsService.current.route(
        {
          origin: pickupCoords,
          destination: dropoffCoords,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          setLoadingRoute(false);
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.current.setDirections(result);
            const route = result.routes[0].legs[0];
            setDistance(route.distance.text);
            setPrice(calculateFare(route.distance.value)); // meters to fare
            setError(null);
          } else {
            setError("Could not calculate route");
            setDistance(null);
            setPrice(null);
          }
        }
      );
    }
  }, [pickupCoords, dropoffCoords]);

  function calculateFare(distanceMeters) {
    const baseFare = 3; // base fare dollars
    const ratePerKm = 1.5; // per km rate
    const kilometers = distanceMeters / 1000;
    return (baseFare + kilometers * ratePerKm).toFixed(2);
  }

  const handlePickupChange = (e) => setPickup(e.target.value);
  const handleDropoffChange = (e) => setDropoff(e.target.value);

  const handleRequestRide = () => {
    alert(
      `Ride requested:\nPickup: ${pickup}\nDropoff: ${dropoff}\nEstimated Price: $${price}`
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "black", color: "white", padding: 16, fontSize: 24, textAlign: "center" }}>
        Uber-like App
      </header>
      <main style={{ flex: 1, display: "flex" }}>
        <div style={{ width: 320, padding: 24, boxShadow: "2px 0 4px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 16 }}>
          <label>
            Pickup Location
            <input
              id="pickup"
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Enter pickup location"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
              autoComplete="off"
            />
          </label>
          <label>
            Dropoff Location
            <input
              id="dropoff"
              type="text"
              value={dropoff}
              onChange={handleDropoffChange}
              placeholder="Enter dropoff location"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
              autoComplete="off"
            />
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {loadingRoute && <p>Loading route...</p>}

          {distance && price && !loadingRoute && (
            <div style={{ background: "#f0f0f0", padding: 12, borderRadius: 6 }}>
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Estimated Price:</strong> ${price}</p>
            </div>
          )}

          <button
            disabled={!pickupCoords || !dropoffCoords || loadingRoute}
            onClick={handleRequestRide}
            style={{
              marginTop: "auto",
              padding: 12,
              background: "#1dbf73",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              border: "none",
              borderRadius: 6,
              cursor: !pickupCoords || !dropoffCoords || loadingRoute ? "not-allowed" : "pointer",
            }}
          >
            Request Ride
          </button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <div ref={mapRef} id="map" style={{ height: "100%", width: "100%" }}></div>
        </div>
      </main>
    </div>
  );
}
