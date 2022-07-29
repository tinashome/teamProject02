import React, { useEffect } from 'react';

const { kakao } = window;

const KakaoMap = ({ address, name }) => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const geocorder = new kakao.maps.services.Geocoder();

    geocorder.addressSearch(address, (result, status) => {

      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:3px 0;">${name}</div>`,
        });

        infowindow.open(map, marker);

        map.setCenter(coords);

        const mapTypeControl = new kakao.maps.MapTypeControl();

        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      }
    });
  }, [address, name]);
  return <div id='map' style={{ width: '100%', height: '250px' }} />;
};

export default KakaoMap;
