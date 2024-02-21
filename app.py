
import string
import flask
from flask_cors import CORS
import flask_cors
import numpy as np
from requests import session

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func,literal_column
from sqlalchemy import desc
from sqlalchemy.sql.expression import case

from flask import Flask, jsonify





#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///meteorite_landing.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
 

# Save reference to the table
Meteorite = Base.classes.meteorite_landing


#################################################
# Flask Setup
#################################################

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#################################################
# Flask Routes
#################################################

@app.route("/")
def homepage():
    return flask.render_template("homepage.html")
    

@app.route("/charts")
def charts():
     return flask.render_template("charts.html")
    

@app.route("/maps")
def maps():
    return flask.render_template("maps.html")

@app.route("/heatmaps")
def heatmaps():
    return flask.render_template("index.html")



@app.route("/meteorites")
def meteorites():
    # # Create our session (link) from Python to the DB
     session = Session(engine)

    # # Query all Meteorites
     results = session.query(Meteorite.id,Meteorite.meteorite_name,Meteorite.nametype, 
                             Meteorite.recclass,Meteorite.fall,getattr(Meteorite, "mass(g)"),
                               Meteorite.year,Meteorite.latitude,Meteorite.longitude).all()

     session.close()

    # # Create a dictionary from the row data and append to a list of all_Meteorite
     all_meteorite = []
     
     for result in results:
       result_dict = {
        "id": result[0],
        "name": result[1],
        "nametype": result[2],
        "recclass": result[3],
        "fall": result[4],
        "mass": result[5],
        "year": result[6],
        "latitude": result[7],
        "longitude": result[8]
    }
       all_meteorite.append(result_dict)

     return jsonify(all_meteorite)

@app.route("/meteorites/<byyear>")
def meteorites_Byyear(byyear):

      # # Create our session (link) from Python to the DB
     session = Session(engine)

    # # Query all Meteorites
     results = session.query(Meteorite.id,Meteorite.meteorite_name,Meteorite.nametype, 
                             Meteorite.recclass,Meteorite.fall,getattr(Meteorite, "mass(g)"),
                             Meteorite.year,Meteorite.latitude,Meteorite.longitude).\
                            filter(Meteorite.year==byyear).order_by(getattr(Meteorite, "mass(g)").desc()).all()

     session.close()

    # # Create a dictionary from the row data and append to a list of all_passengers
     all_meteorite = []
     
     for result in results:
       result_dict = {
        "id": result[0],
        "name": result[1],
        "nametype": result[2],
        "recclass": result[3],
        "fall": result[4],
        "mass": result[5],
        "year": result[6],
        "latitude": result[7],
        "longitude": result[8]
    }
       all_meteorite.append(result_dict)

     return jsonify(all_meteorite)

@app.route("/meteorites_grpby/<byyear>")
def meteorites_GrpBy(byyear):
    # # Create our session (link) from Python to the DB
    session = Session(engine)

    results =  session.query(Meteorite.fall,Meteorite.year,func.count(Meteorite.meteorite_name)) \
                .filter(Meteorite.year == byyear) \
                .group_by(Meteorite.fall) \
                .all()

    session.close()

    result_dict= []


   
    for result in results:
      result_dict.append({
        "fall": result[0],
        "year": result[1],
        "count": result[2]
    })


    return jsonify(result_dict)

@app.route("/meteorites_byclass/<byyear>")
def meteorites_ByClass(byyear):
    # # Create our session (link) from Python to the DB
    session = Session(engine)

    # """Return a list of all Meteorite names"""
    # # Query all Meteorite
    results =  session.query(Meteorite.recclass,Meteorite.year,func.count(Meteorite.meteorite_name)) \
                .filter(Meteorite.year == byyear) \
                .group_by(Meteorite.recclass) \
                .all()

    session.close()

    result_dict= []


   
    for result in results:
      result_dict.append({
        "recclass": result[0],
        "year": result[1],
        "count": result[2]
    })


    return jsonify(result_dict)

@app.route("/meteorites_bymass/<byyear>")
def meteorites_byMass(byyear):
     # # Create our session (link) from Python to the DB
    session = Session(engine)

   
    # """Return a list of all Meteorite names"""
    # # Query all Meteorite
    # results =  session.query(
    #       Meteorite.recclass,
    #     case([
    #     (getattr(Meteorite, "mass(g)") <= 100, "0-100g"),
    #     (getattr(Meteorite, "mass(g)") <= 1000, "101-1000g"),
    #     (getattr(Meteorite, "mass(g)") <= 10000, "1001-10000g"),
    #     (getattr(Meteorite, "mass(g)") == 100000, "10001-100000g")
    #     ], else_="100001g+").label("mass_group"),
    #    func.count().label("count")
    #    ).filter(Meteorite.year == byyear).group_by(Meteorite.recclass, "mass_group").all()

    results = session.query(getattr(Meteorite, "mass(g)"),Meteorite.year).filter(Meteorite.year == byyear).all()


    session.close()



    result_dict= []


    for result in results:
      result_dict.append({
           "mass": result[0],
           "year": result[1],
          
          
     })
    return jsonify(result_dict)
    
@app.route("/meteorites_byMass1/<bymass>")
def meteorites_byMass1(bymass):
     # # Create our session (link) from Python to the DB
    session = Session(engine)




    results =  session.query(Meteorite.recclass,Meteorite.year,Meteorite.latitude,Meteorite.longitude,Meteorite.meteorite_name,getattr(Meteorite, "mass(g)")) \
                .filter(getattr(Meteorite, "mass(g)") > bymass) \
                .all()


    session.close()



    result_dict= []


    for result in results:
      result_dict.append({
           "class": result[0],
           "year": result[1],
            "latitude": result[2],
           "longitude": result[3],
             "name": result[4],
           "mass": result[5],


     })
    return jsonify(result_dict)

 

if __name__ == '__main__':
    # //app.run(debug=True)
    import os

    port = 5000

    # Open a web browser pointing at the app.
    os.system("open http://localhost:{0}".format(port))

    # Set up the development server on port 8000.
    app.debug = True
    app.run(port=port)
