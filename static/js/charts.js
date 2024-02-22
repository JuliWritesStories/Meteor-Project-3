
// JSON data URL
let url = "/meteorites";

 
   
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu= d3.select("#selDataset");
          
            //Fetch the JSON data
  d3.json(url).then(function(data) {
    let types = [];
    let years = [];
    for (i = 0; i < data.length; i++) {
        // Set a variable for the sample names
        let type = data[i].recclass;
        let year = data[i].year;
        types.push(type);
        years.push(year);
    };
   
    let unique_types = [];
    years.forEach(item => {
        if (!unique_types.includes(item)) {
          unique_types.push(item);
          unique_types.sort((a, b) => b - a);
        };
    });

      // Add  samples to dropdown menu
      unique_types.forEach((id) => {

          // Log the value of id for each iteration of the loop
          console.log(id);

          dropdownMenu.append("option")
          .text(id)
          .property("value",id);
      });
         // Set the default valuefrom the list
  //let sample_one = unique_types[0];
  let sample_one = 1967;
  dropdownMenu.property("value",1967);

  // Log the value of sample_one
  //  console.log(sample_one);

  // // Build the initial plots
 buildMetadata(sample_one);
 buildBarChart(sample_one);
 buildBubbleChart(sample_one);
 buildPieChart(sample_one);
 buildClassBarChart(sample_one);
 buildMassPieChart(sample_one);
  });
          
};
//Pie chart using  chart.js library
function buildPieChart(sample){
  let url_piechart = "/meteorites_grpby/"+sample;
  console.log(url_piechart);

  d3.json(url_piechart).then((data) => {
    var labels = data.map(data => data.fall);
    var data = data.map(data => data.count);
    var colors = ["#FFA500", "#CA6F1E"];

    var ctx = document.getElementById("PieChart").getContext("2d");

    // Check if a chart already exists on the canvas
   if (window.Pie) {
    window.Pie.destroy(); // Destroy the existing chart if it exists
  }


    window.Pie = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                responsive: true,
                maintainAspectRatio: true, 
                aspectRatio: 3
            }]
        },
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Fall Type',
                  color:"rgba(245, 245, 245, 1)",
                  font: {
                    size:20,
                    family:"sans-serif",
                    weight:"normal"
                  }
                  
              },
              legend: {
                display: true,
                color:"rgba(245, 245, 245, 1)",
              
               position: "top", // You can set the position to 'top', 'bottom', 'left', or 'right'
                labels: {
                 color:"rgba(245, 245, 245, 1)",
                 font: {
                  size: 15,
                  color: "smokeywhite",
                  // weight: "bold",
                  family:"sans-serif"
                  }
                }
              }
      
          }
        }
       
      
    });

   });


   
  

    
  

};
//Bar chart using chart.js
function buildClassBarChart(sample){

  let url_bclass= "/meteorites_byclass/"+sample;
  console.log(url_bclass);
  d3.json(url_bclass).then((data) => {

    data.sort((a, b) => b.count - a.count);
    const labels = data.map(data => data.recclass);
    const counts = data.map(data => data.count);




    var ctx = document.getElementById("BarChart").getContext("2d");

    // Check if a chart already exists on the canvas
   if (window.Bar) {
    window.Bar.destroy(); // Destroy the existing chart if it exists
  };
  window.Bar = new Chart(ctx, {
    scaleFontColor: "#FFFFFF",
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
          label: "Count",
          data: counts,
         
          backgroundColor: "#CD7F32", 
          borderColor: "#7F2B0A",
          borderWidth: 3
          
      }]
    },
     // backgroundColor: "rgba(54, 162, 235, 0.2)",
          // borderColor: "rgba(54, 162, 235, 1)",
                // backgroundColor: "#7F2B0A", 
                // borderColor: "#F39C12",

    options: {
       
          
      
      plugins: {
        title: {
            display: true,
            color:"rgba(245, 245, 245, 1)",
            text: "Distribution of Meteorites by Class",
            font:{
              size:20,
              family:"sans-serif",
              weight:"normal"
            }
        },

        legend: {
          display: true,
          labels:{
            color:"rgba(245, 245, 245, 1)"

          },
          font:{
            size:20,
            family:"sans-serif"
          }
          
        }
      },
      indexAxis: "x",
      scales: {
          x: {
              display: true,
              title: {
                  display: true,
                  color:"rgba(245, 245, 245, 1)",
                  text: "CLASS",
                 
              },
              min:0,
              max:15,
              ticks:{
                color:"white",
                maxRotation: 45,
                minRotation: 0,
                autoSkip: false,
                maxTicksLimit:15,
                stepSize: 1
              }
             
          },
          y: {
              display: true,
              title: {
                  display: true,
                  color:"rgba(245, 245, 245, 1)",
                  text: 'COUNT  ',
                  fontSize: 40, // Set the font size
                  fontColor: 'black', // Set the font color
                  fontStyle: 'bold' // Set the font style (e.g., bold, italic)
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                color:"white" // Set the step size to 1 for y-axis increments
            }
          }
      },
      title: {
          display: true,
          text: "Distribution of Meteorites Types",
          fontSize: 40, // Set the font size
          fontColor: 'black', // Set the font color
          fontStyle: 'bold' // Set the font style (e.g., bold, italic)
        }
      }
    
        
    });
 });

};





// Function that populates metadata info
function buildMetadata(sample) {

  let url_yr = "/meteorites/"+sample;
console.log(url_yr)

  let metadats =[];
    // Use D3 to retrieve all of the data
    d3.json(url_yr).then((data) => {
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
        //let value = metadats.filter(result => result.year == sample);
          let value = metadats;
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
            "Fell/Found"             :total_meteroites,
            "Types"                  :unique_class.length,
            // "Mass(g)"                :"",
            "Max"                    :max_mass,
            "Min"                    :min_mass
           
        }
        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h3").text(`${key}: ${value}`);
        });
    });

};

// // Function that builds the bar chart
function buildBarChart(sample) {
  let url_yr = "/meteorites/"+sample;
  console.log(url_yr);
  let sampleInfo = [];

  // Use D3 to retrieve all of the data
  d3.json(url_yr).then((data) => {
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
      //let value = sampleInfo.filter(result => result.year == sample);
      let value = sampleInfo;
      //value.sort((a, b) => b.mass - a.mass);
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
         text:xticks,
          type: "bar",
          orientation: "h",
          mode: "markers",
            marker: {                
                color: xticks,
                colorscale:"virvidus",    
                // colors: [
                //   'rgb(255, 255, 204)',
                //    'rgb(128, 0, 38)',
                //    'rgb(189, 0, 38)',
                //    'rgb(227, 26, 28)',
                //    'rgb(252, 78, 42)',
                //    'rgb(253, 141, 60)',
                //    'rgb(254, 178, 76)',
                //    'rgb(254, 217, 118)',
                //   'rgb(255, 237, 160)',
                //   'rgb(255, 247, 180)',
                //   'rgb(255, 250, 190)'],               
                showscale: true // Show color scale
            }
      };

      // Setup the layout
      let layout = {
        title: "Top 10 Largest Meteorites",
        font: {
          color: "white",
          family:  "sans-serif",
          size: 15,
        },
        xaxis: {title: "Mass(g)", font: {
          color: 'white'
        }},
        yaxis: {title: "Meteroites",automargin: true, font: {
          color: 'white'
        }},
        plot_bgcolor:" #406D96",  // Change the background color of the plot area
        paper_bgcolor: "#406D96"
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout);
  });
};

// function buildPieChart(sample) {
//     let sampleInfo = [];
//     // Use D3 to retrieve all of the data
//     d3.json(url).then((data) => {
//         for (let i = 0; i < data.length; i++) {
//             let metadata = {
//                 "name": data[i].name,
//                 "year": data[i].year,
//                 "mass": data[i].mass,
//                 "class": data[i].recclass,
//                 "fall": data[i].fall,
//                 "id": data[i].id
//             };
//             sampleInfo.push(metadata);
//         }
//         // Filter based on the value of the sample
//         let value = sampleInfo.filter(result => result.year == sample);
//         if (value.length === 0) {
//             console.error(`No data found for class: ${sample}`);
//             return;
//         }

//         // Get the first index from the array
//         let valueData = value[0];
//         let met_names =[];
//         let met_years =[];
//         let mass_values =[];
//         let fall_values = [];
//         let ids =[];
//         for(i =0;i<value.length;i++){
//             // Get the names, years, and mass
//             met_names.push(value[i].name);
//             met_years.push(value[i].year);
//             mass_values.push(value[i].mass);
//             fall_values.push(value[i].fall);
//             ids.push(value[i].id);
//         }

//         // Set top ten items to display in descending order
//         // Create labels for the pie chart
//         let labels = met_names.slice(0, 10);
//         // Get corresponding values for the pie chart
//         let values = mass_values.slice(0, 10);
//         // Create a trace for the pie chart
//         let trace = {
//             labels: labels,
//             values: values,
//             type: 'pie',
//             hole: 0.5, // Set the size of the hole for the donut chart
//             textinfo: 'percent',
//             mode: "markers",
//             marker: {
//                 //color: values,
//                 colors: ['rgb(255, 250, 190)','rgb(255, 247, 180)','rgb(255, 237, 160)', 'rgb(254, 217, 118)', 'rgb(254, 178, 76)', 'rgb(253, 141, 60)', 'rgb(252, 78, 42)', 'rgb(227, 26, 28)', 'rgb(189, 0, 38)', 'rgb(128, 0, 38)','rgb(255, 255, 204)'], // Set custom colors for the slices
//                 // showscale: true // Show color scale
//             }

//         };
//         // Set up the layout for the pie chart
//         let layout = {
//             title: "Top 10 Mass Distribution",
//             width: 800, // Set the width of the chart
//             height: 600, // Set the height of the chart
//         };
//         // Plot the pie chart
//         Plotly.newPlot("pie", [trace], layout);
//     });
// }

function buildMassPieChart(sample){

  let url_mass = "/meteorites_bymass/"+sample;
  console.log(url_mass);
  let sampleInfo = [];
  d3.json(url_mass).then((data) => {
    // Extract recclass and count data
   // Categorize meteorite masses into different ranges
   const smallMasses = data.filter(entry => entry.mass <= 10000);
   const mediumMasses = data.filter(entry => entry.mass > 10000 && entry.mass <= 100000);
   const largeMasses = data.filter(entry => entry.mass > 100000);

   // Calculate the percentage of meteorites in each mass range
   const totalMeteorites = data.length;
   const smallMassPercentage = (smallMasses.length / totalMeteorites) * 100;
   const mediumMassPercentage = (mediumMasses.length / totalMeteorites) * 100;
   const largeMassPercentage = (largeMasses.length / totalMeteorites) * 100;

  
   const labels = ["<= 10kg(small)", "10-100kg(medium)", "> 100kg(large)"];
   const values = [smallMassPercentage, mediumMassPercentage, largeMassPercentage];

   const data5 = [{
       values: values,
       labels: labels,
       type: 'pie',
       mode: "markers",
            marker: {
                //color: values,
                colors: ["#EB984E","#CA6F1E","#BA4A00" ]
            }
   }];

   let layout5 = {
    title: "Meteroite Mass Distribution",
    font: {
      
      color: "white",
      family:  "sans-serif",
      size: 15,
    },
    plot_bgcolor:" #406D96",  // Change the background color of the plot area
    paper_bgcolor: "#406D96"
    
};

   Plotly.newPlot('pie_chart', data5,layout5);

});



}

// // Function that builds the bubble chart
function buildBubbleChart(sample) {
    let url_yr = "/meteorites/"+sample;
    console.log('url_yr1',url_yr);
    // Use D3 to retrieve all of the data
    d3.json(url_yr).then((data) => {
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
      //let value = sampleInfo.filter(result => result.year == sample);
        let value = sampleInfo;
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
for(i =0;i<10;i++){
  // Get the names, years, and mass
   met_names.push(value[i].name);
   met_years.push(value[i].year);
   mass_values.push(value[i].mass);
   ids.push(value[i].id);

}
// let met_names_sorted = met_names.slice(0, 10).map(id => ` ${id}`).reverse();
// let mass_values_sorted = mass_values.slice(0, 10).reverse();
// //let met_years_sorted = met_years.slice(0, 10).reverse();
  console.log("metnames",met_names);
        // Set up the trace for bubble chart
        let trace1 = {
            x:  met_names,
            y: mass_values,
            text: met_names,
            mode: "markers",
            marker: {
                size:mass_values.map(mass => Math.sqrt(mass)/10),
                color: mass_values,
                colorscale:"YlOrBr",  
                

                // colors: [
                //   'rgb(255, 255, 204)',
                //    'rgb(128, 0, 38)',
                //    'rgb(189, 0, 38)',
                //    'rgb(227, 26, 28)',
                //    'rgb(252, 78, 42)',
                //    'rgb(253, 141, 60)',
                //    'rgb(254, 178, 76)',
                //    'rgb(254, 217, 118)',
                //   'rgb(255, 237, 160)',
                //   'rgb(255, 247, 180)',
                //   'rgb(255, 250, 190)'],           
                showscale: true // Show color scale
            }
        };

        // Set up the layout
        let layout = {
            annotations: [
            {
              x: 0,  // X-coordinate of the annotation
              y: 0, // Y-coordinate of the annotation
              xref: 'x',
              yref: 'y',
              text: 'Largest Meteorite', // Text of the annotation
              showarrow: true,
              arrowhead: 4,
              ax: 0,
              ay: -40,
            },
            ],
            title: "Meteroites & Mass",
            font: {
              color: "white",
              family: "sans-serif",
              size: 15
            },
            hovermode: "closest",
            xaxis: {title: "Meteroites",automargin: true,font: {
              color: 'white'
            }},
            yaxis: {title: "Mass(g)" , font: {
              color: 'white'
            }},
            plot_bgcolor:" #406D96",  // Change the background color of the plot area
            paper_bgcolor: "#406D96"
            // height: 1000,
            // width: 1500
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};





// This function is called when a dropdown menu item is selected
function optionChanged(value) {
  // Log the new value
  console.log(value); 

  // Call all functions 
  buildMetadata(value);
  buildBarChart(value);
  buildBubbleChart(value);
  buildPieChart(value);
  buildClassBarChart(value);
  buildMassPieChart(value);

    
} ;

            
  



init();