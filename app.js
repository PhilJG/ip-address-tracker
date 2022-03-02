"use strict";

const IPInput = document.querySelector("#input__ip");
const IPaddress = document.querySelector("#output__ip");
const locationOutput = document.querySelector("#output__location");
const timeOutput = document.querySelector("#output__time");
const ISPOutput = document.querySelector("#output__isp");

const btn = document.querySelector("#btn");

let IPValue = IPInput.value;

const map = L.map("map").setView([0, 0], 10);
const marker = L.marker([0, 0]).addTo(map);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const IPRegex =
  /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const fetchIPAddress = function () {
  fetch(`https://api.ipify.org?format=json`)
    .then((res) => res.json())
    .then((data) => (IPInput.value = data.ip));
};

const fetchIPDetails = function () {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_SM7nf8Ww601CicFfwIsuIwIqzobxE&ipAddress=${IPValue}`
  )
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      IPaddress.textContent = data.ip;
      locationOutput.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
      timeOutput.textContent = `UTC ${data.location.timezone}`;
      ISPOutput.textContent = `${data.isp}`;
      marker.setLatLng([`${data.location.lat}`, `${data.location.lng}`]);
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
