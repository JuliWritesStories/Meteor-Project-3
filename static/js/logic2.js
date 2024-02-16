
// JSON data URL
let url = "../static/cleaned_data.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  
    console.log(data);
  });

  function init() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
      let types = [];
      let years = [];
      for (i = 0; i < data.length; i++) {
          // Set a variable for the sample names
          let type = data[i].recclass;
          let year = data[i].year;
      
      types.push(type);
      years.push(year);
      }
     
      let unique_types = [];
      years.forEach(item => {
          if (!unique_types.includes(item)) {
            unique_types.push(item);
          }
      });

        // Add  samples to dropdown menu
        unique_types.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });
           // Set the first sample from the list
    let sample_one = unique_types[0];

    // Log the value of sample_one
    //  console.log(sample_one);

    // // Build the initial plots
   buildMetadata(sample_one);
     buildBarChart(sample_one);
     buildBubbleChart(sample_one);
    // buildGaugeChart(sample_one);
    });
  }

// Function that populates metadata info
function buildMetadata(sample) {
  let metadats =[];
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
      for (i = 0; i < data.length; i++) {
     let metadata ={
      "name":data[i].name,
      "year":data[i].year,
      "mass":data[i].mass,
      "class":data[i].recclass
     
     }
     metadats.push(metadata);
    }
        

        // Filter based on the value of the sample
        let value = metadats.filter(result => result.year == sample);

        // Log the array of metadata objects after the have been filtered
        // console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// // Function that builds the bar chart
function buildBarChart(sample) {
  let sampleInfo = [];

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
      for (let i = 0; i < data.length; i++) {
          let metadata = {
              "name": data[i].name,
              "year": data[i].year,
              "mass": data[i].mass,
              "class": data[i].recclass,
              "id": data[i].id
          };
          sampleInfo.push(metadata);
      }
console.log("sampleInfo",sampleInfo);
      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.year == sample);
      console.log('sample',sample);
    console.log('value',value);
      if (value.length === 0) {
          console.error(`No data found for class: ${sample}`);
          return;
      }
  console.log('value',value);
      // Get the first index from the array
      let valueData = value[0];
      let met_names =[];
      let met_years =[];
      let mass_values =[];
      let ids =[];
for(i =0;i<value.length;i++){
  // Get the names, years, and mass
   met_names.push(value[i].name);
   met_years.push(value[i].year);
   mass_values.push(value[i].mass);
   ids.push(value[i].id);

}
      
  console.log("metnames",met_names);
      // Set top ten items to display in descending order
      let yticks = met_names.slice(0, 10).map(id => ` ${id}`).reverse();
      let xticks = mass_values.slice(0, 10).reverse();
      let labels = met_years.slice(0, 10).reverse();

      // Set up the trace for the bar chart
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h",
          mode: "markers",
            marker: {                
                color: xticks,
                colorscale: "Viridis",                
                showscale: true // Show color scale
            }
      };

      // Setup the layout
      let layout = {
          title: "Top 10 Mass"
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout);
  });
}

// // Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
      let sampleInfo =[];
      for (let i = 0; i < data.length; i++) {
          let metadata = {
              "name": data[i].name,
              "year": data[i].year,
              "mass": data[i].mass,
              "class": data[i].recclass,
              "id": data[i].id
          };
          sampleInfo.push(metadata);
      }

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.year == sample);

      if (value.length === 0) {
          console.error(`No data found for class: ${sample}`);
          return;
      }
  console.log('value',value);
      // Get the first index from the array
      let valueData = value[0];
      let met_names =[];
      let met_years =[];
      let mass_values =[];
      let ids =[];
for(i =0;i<value.length;i++){
  // Get the names, years, and mass
   met_names.push(value[i].name);
   met_years.push(value[i].year);
   mass_values.push(value[i].mass);
   ids.push(value[i].id);

}
let met_names_sorted = met_names.slice(0, 10).map(id => ` ${id}`).reverse();
let mass_values_sorted = mass_values.slice(0, 10).reverse();
let met_years_sorted = met_years.slice(0, 10).reverse();
  console.log("metnames",met_names);
        // Set up the trace for bubble chart
        let trace1 = {
            x:  met_names_sorted,
            y: mass_values_sorted,
            text: met_names_sorted,
            mode: "markers",
            marker: {
                size:mass_values_sorted.map(mass => Math.sqrt(mass)/2),
                color: mass_values_sorted,
                colorscale: "Viridis",                
                showscale: true // Show color scale
            }
        };

        // Set up the layout
        let layout = {
            title: "Meteroides & Mass",
            hovermode: "closest",
            xaxis: {title: "Meteroides"},
            height: 700,
            width: 1200
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

//   // Function that builds the gauge chart
//   function buildGaugeChart(sample) {
  
//       // Use D3 to retrieve all of the data
//       d3.json(url).then((data) => {
  
//           // Retrieve all metadata
//           let metadata = data.metadata;
  
//           // Filter based on the value of the sample
//           let value = metadata.filter(result => result.id == sample);
  
//           // Log the array of metadata objects after the have been filtered
//           console.log(value)
  
//           // Get the first index from the array
//           let valueData = value[0];
  
//           // Use Object.entries to get the key/value pairs and put into the demographics box on the page
//           let washFrequency = Object.values(valueData)[6];
          
//           // Set up the trace for the gauge chart
//           let trace2 = {
//               value: washFrequency,
//               domain: {x: [0,1], y: [0,1]},
//               title: {
//                   text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
//                   font: {color: "black", size: 16}
//               },
//               type: "indicator",
//               mode: "gauge+number",
//               gauge: {
//                   axis: {range: [0,10], tickmode: "linear"},
//                   bar: {color: "black"},
//                   steps: [
//                       {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
//                       {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
//                       {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
//                       {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
//                       {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
//                       {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
//                       {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
//                       {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
//                       {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
//                       {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
//                   ]
//               } 
//           };
  
//           // Set up the Layout
//           let layout = {
//               width: 400, 
//               height: 400,
//               margin: {t: 0, b:0}
//           };
  
//           // Call Plotly to plot the gauge chart
//           Plotly.newPlot("gauge", [trace2], layout)
//       });
//   };

function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    // buildGaugeChart(value);
};

  // Call the initialize function
init();