import React, { useEffect } from 'react';

const { kakao } = window;

const KakaoMap = ({ address, name }) => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // 지도생성

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소 - 좌표 변환 객체를 생성
    const geocorder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocorder.addressSearch(address, (result, status) => {
      // 정상적으로 검색 완료시
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 결과 값으로 받은 위치를 마커로 표시
        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명 (info 안에 정보)
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:3px 0;">${name}</div>`,
        });

        infowindow.open(map, marker);

        // 지도 중심을 결과값으로 받은 위치로 이동 시킨다.
        map.setCenter(coords);
      }
    });
  }, [address, name]);

  return <div id='map' style={{ width: '100%', height: '300px' }} />;
};

export default KakaoMap;
