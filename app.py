from flask import Flask, request, jsonify
from honeypot import AITransactionHoneypot

app = Flask(__name__)
honeypot = AITransactionHoneypot()

@app.route('/start_session', methods=['POST'])
def start_session():
    """Start a new session for tracking."""
    data = request.json
    ip_address = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    geolocation = data.get('geolocation', None)
    
    session_id = honeypot.start_session(ip_address, user_agent, geolocation)
    return jsonify({"session_id": session_id}), 200

@app.route('/transaction', methods=['POST'])
def transaction():
    """Process a transaction."""
    data = request.json
    session_id = data.get('session_id')
    transaction_type = data.get('type')
    amount = data.get('amount')
    source_account = data.get('source_account')
    destination_account = data.get('destination_account', None)
    
    transaction = honeypot.process_transaction(session_id, transaction_type, amount, source_account, destination_account)
    return jsonify(transaction), 200

if __name__ == '__main__':
    app.run(debug=True)
