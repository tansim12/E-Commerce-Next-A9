"use client"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from 'leaflet';

const Map = () => {
  const position:LatLngTuple = [24.006, 89.2372];

  const mapStyle = {
    height: "400px", // Set the height of the map
    width: "100%", // Set the width of the map
  };

  return (
    <>
      <div className="overflow-hidden">
        <MapContainer
          center={position} 
          zoom={13}
          scrollWheelZoom={false}
          style={mapStyle}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;