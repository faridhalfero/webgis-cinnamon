// Inisialisasi peta
const map = L.map('map').setView([-0.5, 100.5], 9);

// --- Basemap Layers ---
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map); // aktif default

const esriImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles © Esri & Contributors',
    maxZoom: 19
  }
);

const esriStreets = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles © Esri Streets',
    maxZoom: 19
  }
);

const cartoLight = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
  }
);

const stamenTerrain = L.tileLayer(
  'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
  {
    attribution: 'Map tiles by Stamen Design',
    maxZoom: 18
  }
);

// --- Layer Control ---
const baseMaps = {
  "OpenStreetMap (Jalan)": osm,
  "Citra Satelit (Esri)": esriImagery,
  "Peta Jalan Modern (Esri Streets)": esriStreets,
  "Peta Bersih (Carto Light)": cartoLight,
  "Topografi (Stamen Terrain)": stamenTerrain
};

L.control.layers(baseMaps).addTo(map);

// --- Tampilkan GeoJSON ---
fetch('Kayumanis.geojson')
  .then(res => res.json())
  .then(data => {
    const geoLayer = L.geoJSON(data, {
      style: {
        color: "#ff6600",
        weight: 2,
        fillOpacity: 0.4
      },
      onEachFeature: function (feature, layer) {
        let popup = "<b>Informasi Polygon:</b><br>";
        for (const key in feature.properties) {
          popup += `<strong>${key}</strong>: ${feature.properties[key]}<br>`;
        }
        layer.bindPopup(popup);
      }
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds()); // zoom ke data
  })
  .catch(err => {
    console.error("Gagal memuat GeoJSON:", err);
    alert("File GeoJSON tidak ditemukan atau rusak.");
  });
