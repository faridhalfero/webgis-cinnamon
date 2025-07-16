const map = L.map('map').setView([-0.5, 100.5], 9); // Sesuaikan koordinat

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON
fetch('Kayumanis.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });
