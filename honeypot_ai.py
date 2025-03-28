from flask import Flask, request, jsonify
import joblib
import datetime
import logging
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("fraud_model.pkl")

# Configure logging
logging.basicConfig(filename="honeypot_ai.log", level=logging.INFO, format="%(asctime)s - %(message)s")

@app.route('/detect_honeypot', methods=['POST'])
def detect_honeypot():
    try:
        data = request.json

        transaction_id = data.get("transaction_id")
        amount = data.get("amount")
        frequency = data.get("frequency")
        sender_ip = data.get("sender_ip")
        receiver_ip = data.get("receiver_ip")

        # Convert data to model format
        features = np.array([[amount, frequency]])
        prediction = model.predict(features)[0]  # 0 = Safe, 1 = Honeypot

        risk_level = "Honeypot" if prediction == 1 else "Legit"

        # Log suspicious transactions
        if prediction == 1:
            log_entry = f"Suspicious Transaction Detected! ID: {transaction_id}, Amount: {amount}, Sender: {sender_ip}, Receiver: {receiver_ip}, Risk Level: {risk_level}"
            logging.info(log_entry)

        return jsonify({"transaction_id": transaction_id, "risk_level": risk_level})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5003)
