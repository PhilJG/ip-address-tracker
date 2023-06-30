"use strict";

const IPInput = document.querySelector("#input__ip");
const IPaddress = document.querySelector("#output__ip");
const locationOutput = document.querySelector("#output__location");
const timeOutput = document.querySelector("#output__time");
const ISPOutput = document.querySelector("#output__isp");

const btn = document.querySelector("#btn");

let IPValue = IPInput.value;
const IPRegex =
  /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const myIcon = L.icon({
  iconUrl: "icon-location.svg",
  iconSize: [32, 40],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
const map = L.map("map").setView([0, 0], 10);
const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const fetchIPAddress = function () {
  fetch(`https://api.ipify.org?format=json`)
    .then((res) => res.json())
    .then((data) => {
      IPInput.value = data.ip;
      fetchIPDetails();
    });
};

const fetchIPDetails = function () {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_Urd5XxVIJyIlJmvEjrQjRU0EPkRbR&ipAddress=${IPValue}`
  )
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      IPaddress.textContent = data.ip;
      locationOutput.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
      timeOutput.textContent = `UTC ${data.location.timezone}`;
      ISPOutput.textContent = `${data.isp}`;
      marker.setLatLng([`${data.location.lat}`, `${data.location.lng}`]);
      map.setView([`${data.location.lat}`, `${data.location.lng}`], 13);
    });
};

fetchIPAddress();
btn.addEventListener("click", fetchIPDetails);

// const checkInputValue = function () {
// const successCallback = (position) => {
//   console.log(
//     `Lat ${position.coords.latitude} & Long ${position.coords.longitude}`
//   );
// };

// const errorCallback = (error) => {
//   console.error(error);
// };
// // };

// const watchId = navigator.geolocation.watchPosition(
//   successCallback,
//   errorCallback
// );

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
