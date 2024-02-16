
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
            unique_types.sort((a, b) => b - a);
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
     buildPieChart(sample_one);
     buildClassBarChart(sample_one);
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
        
        
        let MassData =[];
        let classData =[];
        let nameData =[];
        let total_meteroites = value.length;
        for ( i =0;i< value.length;i++){
            MassData.push(value[i].mass);
            classData.push(value[i].class);
            nameData.push(value[i].name);
        }
        let total_mass =0;
        
        var max_mass = Math.max(...MassData);
        var min_mass = Math.min(...MassData);
        let unique_class = [];
        classData.forEach(item => {
            if (!unique_class.includes(item)) {
                unique_class.push(item);
            }
        });
        let valueData ={
            "Max Mass" :max_mass,
            "Min Mass" :min_mass,
            "Total Meteroites" : total_meteroites,
            "Meteroite Types" :unique_class.length
        }
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
      value.sort((a, b) => b.mass - a.mass);
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
   //mass_values.sort((a, b) => b - a);
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
        //   text: labels,
          type: "bar",
          orientation: "h",
          mode: "markers",
            marker: {                
                color: xticks,
                colorscale: "YlOrRd",                
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

function buildClassBarChart(sample) {
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
        let met_class =[];
        let met_years =[];
        let mass_values =[];
        let ids =[];
  for(i =0;i<value.length;i++){
    // Get the names, years, and mass
    met_class.push(value[i].class);
     met_years.push(value[i].year);
     mass_values.push(value[i].mass);
     ids.push(value[i].id);
  
  }
        
    
        // Set top ten items to display in descending order
        let xticks = mass_values.slice(0, 10).map(id => ` ${id}`).reverse();
        let yticks = met_class.slice(0, 10).reverse();
        let labels = met_years.slice(0, 10).reverse();
        console.log("hi",xticks,yticks,labels);

        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,           
            type: "bar",
            mode: "markers",
              marker: {                
                  color: xticks,
                  colorscale: "YlOrRd",                
                  showscale: true // Show color scale
              }
        };
  
        // Setup the layout
        let layout = {
            title: "Top 10 Mass"
        };
  
        // Call Plotly to plot the bar chart
        Plotly.newPlot("hbar", [trace], layout);
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
                colorscale: "YlOrRd",                
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

// // Function that builds the pie chart

function buildPieChart(sample) {
    let sampleInfo = [];
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        for (let i = 0; i < data.length; i++) {
            let metadata = {
                "name": data[i].name,
                "year": data[i].year,
                "mass": data[i].mass,
                "class": data[i].recclass,
                "fall": data[i].fall,
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

        // Get the first index from the array
        let valueData = value[0];
        let met_names =[];
        let met_years =[];
        let mass_values =[];
        let fall_values = [];
        let ids =[];
        for(i =0;i<value.length;i++){
            // Get the names, years, and mass
            met_names.push(value[i].name);
            met_years.push(value[i].year);
            mass_values.push(value[i].mass);
            fall_values.push(value[i].fall);
            ids.push(value[i].id);
        }

        // Set top ten items to display in descending order
        // Create labels for the pie chart
        let labels = met_names.slice(0, 10);
        // Get corresponding values for the pie chart
        let values = mass_values.slice(0, 10);
        // Create a trace for the pie chart
        let trace = {
            labels: labels,
            values: values,
            type: 'pie',
            hole: 0.5, // Set the size of the hole for the donut chart
            textinfo: 'percent',
            mode: "markers",
            marker: {
                //color: values,
                colors: ['rgb(255, 250, 190)','rgb(255, 247, 180)','rgb(255, 237, 160)', 'rgb(254, 217, 118)', 'rgb(254, 178, 76)', 'rgb(253, 141, 60)', 'rgb(252, 78, 42)', 'rgb(227, 26, 28)', 'rgb(189, 0, 38)', 'rgb(128, 0, 38)','rgb(255, 255, 204)'], // Set custom colors for the slices
                // showscale: true // Show color scale
            }

        };
        // Set up the layout for the pie chart
        let layout = {
            title: "Top 10 Mass Distribution",
            width: 800, // Set the width of the chart
            height: 600, // Set the height of the chart
        };
        // Plot the pie chart
        Plotly.newPlot("pie", [trace], layout);
    });
}










function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildPieChart(value);
    buildClassBarChart(value);
    
};

  // Call the initialize function
init();