from datetime import datetime
import json
import jwt
import os
import datetime
from passlib.hash import sha256_crypt
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_mysqldb import MySQL 
from flask_cors import CORS, cross_origin



#app config
app=Flask(__name__)
CORS(app, support_credentials=True)
app.config['SECRET_KEY']='JWTAuthKey'

#DB config 
 
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'mysql')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'flaskuser')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'flaskuser')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'TrafficDb')

# app.config['MYSQL_HOST'] = 'mysql'
# app.config['MYSQL_USER'] = 'flaskuser'
# app.config['MYSQL_PASSWORD'] = 'flaskuser'
# app.config['MYSQL_DB'] = 'TrafficDb' 

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'root'
# app.config['MYSQL_DB'] = 'TrafficDb' 
mysql = MySQL(app)

#API endpoints
@app.route('/')
def index():
    return jsonify('hello world')

# @app.route('/login',methods=['POST'])
# @cross_origin(supports_credentials=True)
# def login():
#     data=request.get_json()
    
#     username=data.get('username')
#     password=data.get('password')
    
#     if not username or not password:
#         return jsonify({'message':'invalid credentials'}),403
#     if password=='admin123' and username=='admin':
#         token=jwt.encode({'user':'admin','exp':datetime.datetime.utcnow()+datetime.timedelta(days=30)}, app.config['SECRET_KEY'], algorithm="HS256")
#         return jsonify({'user':'admin','token': token}),200
#     else:
#         return jsonify({'message':'invalid credentials'}),403
    
@app.route('/api/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # hashed_password = sha256_crypt.hash(password)

    if not username or not password:
        return jsonify({'message': 'Invalid credentials'}), 403

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT username, password FROM users WHERE username = %s", (username,))
    user_data = cursor.fetchone()

    # if user_data and user_data[1] == password:
    if user_data and sha256_crypt.verify(password, user_data[1]):
        # Generate JWT token
        token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)},
                          app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'user': username, 'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 403

    
@app.route('/api/isloggedin', methods=['POST'])
def isauth():
    data=request.get_json()
    token= data.get('token')
    valid= jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
    if valid:
        
        return jsonify({'success':True,'data':'admin'}),200
    else:
        return jsonify({'success':False}),403
    
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Invalid credentials'}), 400

    hashed_password = sha256_crypt.hash(password)

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
    # cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    mysql.connection.commit()

    return jsonify({'message': 'Signup successful'}), 201

@app.route('/api/offences/all')
def all():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute(''' SELECT c.repno, c.dlno, c.regno, d.d_name, c.o_type, c.o_date, c.location, o.fine, c.ispaid FROM driver d, commits c, offences o where d.dlno=c.dlno and o.o_type=c.o_type ''') #Query
        # cursor.execute('''select * from all_details ''')
        # cursor.execute('''select * from commits ''')
        data=cursor.fetchall()
        return jsonify({'data':data}),200
    except:
        return jsonify({'error':'database error'}),500
    

@app.route('/api/offences/del/<repno>', methods=['POST'])
def offDel(repno):
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM commits WHERE repno=%s''',[repno])
    mysql.connection.commit()
    return jsonify("Deleted!")

@app.route('/api/offences/getOffence/<type>', methods=['GET'])
def getOff(type):
    cursor = mysql.connection.cursor()
    cursor.execute('''select fine from offences where o_type=%s''', [type])
    data=cursor.fetchall()
    return jsonify(data)

@app.route('/api/offences/new/',methods=["POST"])
@cross_origin(supports_credentials=True)
def offIns():
    data=request.get_json()
    repno=data.get('repno')
    dlno=data.get('dlno')
    regno=data.get('regno')
    impound=data.get('impound')
    location=data.get('location')
    type=data.get('type')
    time=data.get('time')
    paid=data.get('paid')
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO commits VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''',(repno,dlno,regno,time,location,type,paid,impound))
    mysql.connection.commit()
    return jsonify("success"), 200

@app.route('/api/offences/search/<dlno>',methods=["GET"])
def searchDlno(dlno):
    cursor = mysql.connection.cursor()
    #cursor.execute(''' SELECT d.dlno, d._name, o._type, c._time, c.location, o.fine, c.paid, c.repno FROM driver d, commits c, offences o WHERE d.dlno=c.dlno and o.offenceid=c.offenceid and d.dlno=%s''',[dlno])
    cursor.execute(''' SELECT c.repno, c.dlno, c.regno, d.d_name, c.o_type, c.o_date, c.location, o.fine, c.ispaid FROM driver d, commits c, offences o where d.dlno=c.dlno and o.o_type=c.o_type and d.dlno=%s''',[dlno])
    data = cursor.fetchall()
    return jsonify({'data':data}),200

@app.route('/api/offences/getDname/<dlno>', methods=['GET'])
def getDname(dlno):
    cursor = mysql.connection.cursor()
    cursor.execute('''select d_name from driver where dlno=%s''', [dlno])
    data=cursor.fetchall()
    return jsonify(data)

#app run config
app.run(host='0.0.0.0', port= 5000)
