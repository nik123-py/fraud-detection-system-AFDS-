from flask import Flask, jsonify, request
import pymysql
import logging
from flask_cors import CORS  # ✅ Import CORS

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS

# Set up logging
logging.basicConfig(level=logging.INFO)

# Database connection settings
config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Mommabest@03',
    'database': 'transactiondb',
    'cursorclass': pymysql.cursors.DictCursor  # Ensures JSON-compatible output
}

@app.route('/fetch_transactions', methods=['GET'])
def fetch_transactions():
    try:
        cnx = pymysql.connect(**config)
        cursor = cnx.cursor()

        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()
        print("Connected to:", db_name)  # Debugging output

        query = "SELECT username, amount, date, status, risklevel FROM transactiondata"
        cursor.execute(query)
        transactions = cursor.fetchall()

        cursor.close()
        cnx.close()
        return jsonify(transactions)

    except pymysql.MySQLError as err:
        logging.error(f"MySQL Error: {err}")
        return jsonify({"error": f"MySQL Error: {err}"}), 500

    except Exception as e:
        logging.error(f"General Error: {e}")
        return jsonify({"error": f"General Error: {e}"}), 500

@app.route('/get_transaction_count', methods=['GET'])
def get_transaction_count():
    try:
        cnx = pymysql.connect(**config)
        cursor = cnx.cursor()
        cursor.execute("SELECT COUNT(*) AS count FROM transactiondata")
        count = cursor.fetchone()
        cursor.close()
        cnx.close()
        return jsonify(count)
    except pymysql.MySQLError as err:
        logging.error(f"MySQL Error: {err}")
        return jsonify({"error": "Database error"}), 500

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    try:
        data = request.json
        transactionid = data.get("transactionid")
        username = data.get("username")
        amount = data.get("amount")
        date = data.get("date")
        risklevel = data.get("risklevel")
        status = data.get("status")

        cnx = pymysql.connect(**config)
        cursor = cnx.cursor()

        query = "INSERT INTO transactiondata (transactionid, username, amount, date, risklevel, status) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (transactionid, username, amount, date, risklevel, status))

        cnx.commit()
        cursor.close()
        cnx.close()

        return jsonify({"message": "Transaction added successfully!"}), 201
    except pymysql.MySQLError as err:
        logging.error(f"MySQL Error: {err}")
        return jsonify({"error": "Database error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
