# Meteor-Project-3
Meteors are out of this world! Yet the tales they tell hit incredibly close to home. They are traveling histories that can teach us more about our existence than one might think. The composition of every meteor informs us how our solar system has evolved. They detail changes in our sun, inlfuences on each planet, and what possible futures humanity could have. That information is invaluable to scientists. But despite its importance, meteorite data is incredibly hard to capture. Thousands of meteors hit Earth every year creating data points that are far too numerous to analyze by hand. Our meteorite dashboard aims to streamline this process. 

Our dashboard presents five easy to understand visualizations, an interactive map of landing locations, and an informative homepage for learners of any level. Our data is sourced directly from NASA and is safely stored within a SQLite database. Our data represents over 37,000 meteorites dating from 860 C.E. to 2013 C.E. That is over a thousand years of data! With the meteorite dashboard in hand, your dreams of understanding our solar system are well within reach. 

To start, input python app.py into your terminal to launch the dashboard. Ctrl click the running link once it appears. This will take you to the dashboard home page. Here you can find information about the origin of meteorites, types of meteorites, variability of sizes, impact craters, and their scientific importance. Additionally, you will find three tabs in the upper right hand corner: Home, Charts, and Maps.

Using the Home tab will immediately return you to the dashboard homepage.

Using the Charts tab will take you to our charts page. A year filter is available in the upper left hand portion of page. This allows users to select which year's data they would like to view. Immediately below the filter is a small demographic box. In this box, users can see how many meteors were recorded that year, how many different types of meteors there were, the mass of the largest meteor, and the mass of the smallest meteor. The rest of the page contains five visualizations that update with year selection. 

Using the Maps tab will take you to an interactive map displaying meteor landing sites from across the world. In the center of this page, users can filter by meteorite mass. The map will automatically update to only display meteors meeting the selected criteria. 

Ethical considerations were made for this project by only using publically available government data. No data presented in this dashboard was obtained unethically. Our dashboard is powered by Flask Backend API routes that serve to JavaScript powered visualizations. Our data is stored within a SQLite database. Excel documents of the data are available in the rescources folder. JavaScript and CSS files are available in the Static folder. HTML files are available in the templates folder. 

Rescources:
Nasa Meteoritical Society data set: https://catalog.data.gov/dataset/meteorite-landings
Requirements for use:
Python
sqllite
Flask
Flask-Cors
Pandas
ploty.js
chart.js
