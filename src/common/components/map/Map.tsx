/* eslint-disable @typescript-eslint/no-explicit-any */
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import L, { LatLng } from 'leaflet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FeatureGroup, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import useLocale from '../../../hooks/useLocale';
import isTestEnv from '../../../utils/isTestEnv';
import styles from './map.module.scss';
import { localizeMap } from './utils';
L.Icon.Default.imagePath = '/images/';

const DEFAULT_CENTER: LatLng = new LatLng(60.171944, 24.941389);

interface Props {
  onChange: (position: LatLng | null) => void;
  position: LatLng | null;
}

const Map: React.FC<Props> = ({ onChange, position }) => {
  const center = position || DEFAULT_CENTER;
  const [initialPosition] = React.useState(position);
  const locale = useLocale();
  const { t } = useTranslation();

  const featureGroup = React.useRef<any>();

  const onCreated = (e: any) => {
    const layerId = e.layer._leaflet_id;
    const drawnItems = featureGroup.current._layers;
    const drawnItemKeys = Object.keys(drawnItems);

    drawnItemKeys.forEach((id) => {
      if (Number.parseInt(id) !== layerId) {
        const layer = drawnItems[id];
        featureGroup.current.removeLayer(layer);
      }
    });

    handleChange();
  };

  const handleAction = () => {
    handleChange();
  };

  const handleChange = () => {
    const drawnItems = featureGroup.current._layers;
    const drawnItemKeys = Object.keys(drawnItems);

    if (drawnItemKeys.length) {
      drawnItemKeys.forEach((layerid, index) => {
        if (index === drawnItemKeys.length - 1) {
          const layer = drawnItems[layerid];
          onChange(layer._latlng);
        }
      });
    } else {
      onChange(null);
    }
  };

  React.useEffect(() => {
    !isTestEnv && localizeMap(t);
  }, [locale, t]);

  return (
    <MapContainer
      center={center}
      className={styles.mapContainer}
      minZoom={3}
      maxZoom={18}
      zoom={15}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {!isTestEnv && (
        <FeatureGroup ref={featureGroup}>
          <EditControl
            position="topright"
            onCreated={onCreated}
            onDeleted={handleAction}
            onEdited={handleAction}
            draw={{
              circlemarker: false,
              circle: false,
              marker: true,
              polyline: false,
              polygon: false,
              rectangle: false,
            }}
          />
          {initialPosition && <Marker position={initialPosition} />}
        </FeatureGroup>
      )}
    </MapContainer>
  );
};

export default Map;
