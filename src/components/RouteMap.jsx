"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const RouteMap = ({ gpxFileName }) => {
  const [route, setRoute] = useState([]);
  const [center, setCenter] = useState([40.4168, -3.7038]); // Default to Madrid
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndParseGPX = async () => {
      try {
        const response = await fetch(`/routes/${gpxFileName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const gpxData = await response.text();
        console.log('Fetched GPX data:', gpxData.slice(0, 200) + '...'); // Log the first 200 characters

        const parser = new DOMParser();
        const gpxDoc = parser.parseFromString(gpxData, 'text/xml');
        const trackPoints = gpxDoc.getElementsByTagName('trkpt');
        const routeCoords = [];

        for (let i = 0; i < trackPoints.length; i++) {
          const lat = parseFloat(trackPoints[i].getAttribute('lat'));
          const lon = parseFloat(trackPoints[i].getAttribute('lon'));
          if (!isNaN(lat) && !isNaN(lon)) {
            routeCoords.push([lat, lon]);
          }
        }

        console.log(`Parsed ${routeCoords.length} coordinates`);
        if (routeCoords.length > 0) {
          console.log('First coordinate:', routeCoords[0]);
          console.log('Last coordinate:', routeCoords[routeCoords.length - 1]);
          setRoute(routeCoords);
          setCenter(routeCoords[0]);
        } else {
          setError('No valid coordinates found in GPX data');
        }
      } catch (error) {
        console.error('Error fetching or parsing GPX data:', error);
        setError(`Error loading GPX data: ${error.message}`);
      }
    };

    if (gpxFileName) {
      fetchAndParseGPX();
    } else {
      setError('No GPX file name provided');
    }
  }, [gpxFileName]);

  const MapComponent = () => {
    const map = useMap();

    useEffect(() => {
      if (route.length > 0) {
        const bounds = L.latLngBounds(route);
        map.fitBounds(bounds);
        console.log('Map bounds set to:', bounds.toString());
      }
    }, [map, route]);

    return (
      <>
        <Polyline positions={route} color="blue" weight={4} opacity={0.7} />
        {route.length > 0 && (
          <>
            <Marker position={route[0]} />
            <Marker position={route[route.length - 1]} />
          </>
        )}
      </>
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>Total points: {route.length}</p>
      <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapComponent />
      </MapContainer>
    </div>
  );
};

export default RouteMap;