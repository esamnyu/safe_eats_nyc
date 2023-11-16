import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapView = ({ restaurants }) => {
  const defaultCenter = [40.7128, -74.0060]; // Default to New York City
  const defaultZoom = 13;

  // Custom icon
  const icon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {restaurants.map(restaurant => (
        <Marker
          key={restaurant.camis}
          position={[restaurant.latitude, restaurant.longitude]}
          icon={icon}
        >
          <Popup>
            {restaurant.dba} - {restaurant.boro}<br />
            Cuisine: {restaurant.cuisineDescription}<br />
            Grade: {restaurant.grade}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
