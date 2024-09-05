"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const RouteMap = ({ gpxData }) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Convertir el archivo GPX a coordenadas de Leaflet
    const parser = new DOMParser();
    const gpxDoc = parser.parseFromString(gpxData, 'application/xml');
    const trackPoints = gpxDoc.getElementsByTagName('trkpt');
    const routeCoords = [];

    for (let i = 0; i < trackPoints.length; i++) {
      const lat = parseFloat(trackPoints[i].getAttribute('lat'));
      const lng = parseFloat(trackPoints[i].getAttribute('lon'));
      routeCoords.push([lat, lng]);
    }

    setRoute(routeCoords);
  }, [gpxData]);

  const MapComponent = () => {
    const map = useMap();

    useEffect(() => {
      if (route.length > 0) {
        // Ajustar el mapa para mostrar toda la ruta
        const bounds = L.latLngBounds(route);
        map.fitBounds(bounds);
      }
    }, [map, route]);

    return (
      <Polyline positions={route} color="blue" weight={4} opacity={0.5} />
    );
  };

  return (
    <MapContainer center={route[0] || [0, 0]} zoom={13} style={{ height: '500px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapComponent />
    </MapContainer>
  );
};

export default RouteMap;