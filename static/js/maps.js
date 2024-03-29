

function init() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
  

// Your array of values
let valuesArray = ["0","10000","50000", "100000", "200000","400000","59000000"];


// Append options to the dropdown for each value in the array
valuesArray.forEach(function(value) {
    dropdownMenu.append("option")
        .text(value)
        .attr("value", value);
});
     let defaultMass = valuesArray[0];
        dropdownMenu.property("value", defaultMass);

        // Build the initial map
        buildMap(defaultMass);
    // // Fetch the JSON data
    // d3.json(url).then(function(data) {
    //     let types = [];
    //     let years = [];
    //     let masses = [];
        
    //     for (let i = 0; i < data.length; i++) {
    //         let type = data[i].recclass;
    //         let year = data[i].year;
    //         let mass = data[i].mass;
    //         types.push(type);
    //         years.push(year);
    //         masses.push(mass);
    //     };

    //     let uniqueYears = Array.from(new Set(masses)).sort((a, b) => b - a);

    //     // Add options to dropdown menu
    //     uniqueYears.forEach((year) => {
    //         dropdownMenu.append("option")
    //             .text(year)
    //             .property("value", year);
    //     });
    //   console.log('uniqueYears',uniqueYears);
    //     // Set the default value
    //     let defaultYear = uniqueYears[0];
    //     dropdownMenu.property("value", defaultYear);

    //     // Build the initial map
    //     buildMap(defaultYear);
    // });
}

function buildMap(defmass) {
    
    // let queryUrl = "/meteorites/"+year;
    let queryUrl = `/meteorites_byMass1/${defmass}`;
console.log('queryUrl',queryUrl);
    // Perform a GET request to the query URL
    d3.json(queryUrl).then(function(data) {
        let features = [];
        console.log('data',data);
        for (let i = 0; i < data.length; i++) {
            let feature = {
                "type": "Feature",
                "name": data[i].name,
                "classType":data[i].class,
                "year":data[i].year,
                "met_count":data.length,
                "properties": {
                    "mass": data[i].mass
                    
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [data[i].latitude, data[i].longitude]
                }
            };
            features.push(feature);
        }
        console.log('features',features);
        createMap(features);
    });
}

let myMap;

function createMap(meteoriteData) {
    // Check if the map already exists, if so, remove it
    if (myMap) {
        myMap.remove();
    }

    // Create the base layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a GeoJSON layer
    let meteoritesLayer = L.geoJSON(meteoriteData, {
        pointToLayer: function(feature, latlng) {
            let mass = feature.properties.mass;
            return L.circleMarker(latlng, {
                radius: Math.sqrt(mass) /60,
                color: "#000",
                fillColor: getColor(mass),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            // let class = feature.class;
            let name = feature.name;
            let mass = feature.properties.mass;
            let geoLocation = feature.geometry.coordinates;
            let classType  = feature.classType;
            let year  = feature.year;
            let met_count =feature.met_count;
            layer.bindPopup(`<h3 style="font-size: 26px;">Name: ${name}</h3><hr><p style="font-size: 24px;">Type: ${classType}</p><p style="font-size: 24px;">${year }: ${met_count }</p><p style="font-size: 24px;">Mass: ${mass }</p>`);
        }
    });

    // Create a legend
    let legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        let div = L.DomUtil.create('div', 'info legend');
        let depthColors = ['#00FF00', '#FFFF00', '#FFA500', '#41b6c4', '#081d58', '#FF0000','#FFC0CB'];
        let depthLabels = ['0 - 10k', '10k - 50k', '50k - 100k', '100k - 200k', '200k - 400k', '400k-60000k','>60000k'];
        div.style.fontSize = '26px';
        for (let i = 0; i < depthColors.length; i++) {
            div.innerHTML += '<i style="background:' + depthColors[i] + '; width: 40px; height: 40px; display: inline-block;"></i> ' + depthLabels[i] + '<br>';
        }
        return div;
    };

    // Create our map
    myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, meteoritesLayer]
    });

    // Add layers control
    let baseMaps = { "Street Map": street };
    let overlayMaps = { "Meteorites": meteoritesLayer };
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Add legend to the map
    legend.addTo(myMap);
}

// Function called when a dropdown menu item is selected
function optionChanged(value) {
    buildMap(value);
}

// Function to get color based on mass
function getColor(mass) {
    if (mass < 10000) {
        return '#00FF00';
    } else if (mass < 50000) {
        return '#FFFF00';
    } else if (mass < 100000) {
        return '#FFA500';
    } else if (mass < 200000) {
        return '#41b6c4';
    } else if (mass < 400000) {
        return '#081d58';
    } else if (mass < 59000000) {
        return '#FF0000';
    }
    else{
        return '#FFC0CB'
    }
}

// Initialize the application
init();