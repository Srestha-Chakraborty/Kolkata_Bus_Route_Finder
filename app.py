from flask import Flask, render_template, request, jsonify
import mysql.connector
import os

app = Flask(__name__)

# Read database configuration from environment variables
db_config = {
    'host': os.environ.get('localhost:3306'),
    'user': os.environ.get('root'),
    'password': os.environ.get('Soumya@7'),
    'database': os.environ.get('FindMyBus.sql')
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/find_route', methods=['POST'])
def find_route():
    source = request.form['source']
    destination = request.form['destination']
    
    # Connect to MySQL
    try:
        conn = mysql.connector.connect(db_config)
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT bus_no, source, destination
        FROM bus
        WHERE source = %s AND destination = %s
        """
        cursor.execute(query, (source.upper(), destination.upper()))
        results = cursor.fetchall()
        
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)