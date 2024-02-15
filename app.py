
from flask import Flask, render_template, request, redirect, session
import sqlite3 as sql

app = Flask(__name__)
app.secret_key = 'fasdgfdgdfg'


@app.route('/')
def home():
   return render_template('index.html')

@app.route('/maps')
def maps():
   return render_template('maps.html')

@app.route('/charts')
def charts():
   return render_template('charts.html')


if __name__ == '__main__':
   app.run(debug = True)