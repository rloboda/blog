from flask import Flask, jsonify, request
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

DB_HOST = 'localhost'
DB_NAME = 'blog'
DB_USER = 'postgres'
DB_PASSWORD = '1234'
DB_PORT = '5432'

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
        return None
    
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO users (email, password) VALUES ( %s, %s)",
                (email, hashed_password),
            )
            conn.commit()
            cur.close()
            conn.close()
            return jsonify({'message': 'User registered successfully'}), 201
        except psycopg2.IntegrityError:
            return jsonify({'error': 'Email already exists'}), 400
        except Exception as e:
            print(f"Error during registration: {e}")
            return jsonify({'error': 'An error occurred'}), 500
        
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cur.fetchone()
            cur.close()
            conn.close()

            if user and check_password_hash(user[2], password):
                return jsonify({'message': 'Login successful'}), 200
            else:
                return jsonify({'error': 'Invalid email or password'}), 401
        except Exception as e:
            print(f"Error during login: {e}")
            return jsonify({'error': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)