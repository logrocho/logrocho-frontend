import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, IconOptions } from "leaflet";
import Link from "next/link";

export default function MapaComponent({ bares }) {
  const icon: Icon<IconOptions> = new Icon({
    iconUrl: "/images/marker.png",
    iconSize: [25, 25],
  });
  return (
    <React.Fragment>
      <MapContainer
        center={[42.465619856195644, -2.4480504467878696]}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bares.data.bares.map((bar, index) => (
          <Marker
            key={index}
            draggable={false}
            icon={icon}
            position={[bar.latitud, bar.longitud]}
            autoPan={true}
          >
            <Popup>
              <div className="flex flex-col items-start gap-y-1">
                <span className="font-roboto font-black text-xs">
                  {bar.nombre}
                </span>
                <span className="font-roboto font-black text-xs">
                  ⭐{Math.round(bar.media_puntuacion * 100) / 100}
                </span>
                <Link
                  href={{
                    pathname: "/bar/[idBar]",
                    query: { idBar: bar.id },
                  }}
                >
                  <a href="">Ver fichar bar</a>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </React.Fragment>
  );
}
