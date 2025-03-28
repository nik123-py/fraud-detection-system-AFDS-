import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load or create transaction data
def generate_synthetic_data():
    np.random.seed(42)
    data = {
        "transaction_id": np.arange(1, 501),
        "amount": np.random.randint(10, 20000, 500),
        "frequency": np.random.randint(1, 30, 500),  # How many times sender has sent money
        "sender_ip": np.random.choice(["192.168.1.1", "10.0.0.2", "172.16.0.3", "203.0.113.5"], 500),
        "receiver_ip": np.random.choice(["93.184.216.34", "104.26.4.4", "192.0.2.7"], 500),
        "risk_level": np.random.choice([0, 1], 500, p=[0.85, 0.15])  # 85% legit, 15% honeypot
    }
    df = pd.DataFrame(data)
    df.to_csv("transaction_data.csv", index=False)

# Generate data if not present
generate_synthetic_data()

# Load dataset
df = pd.read_csv("transaction_data.csv")

# Define features and target
X = df[["amount", "frequency"]]
y = df["risk_level"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "fraud_model.pkl")

print("✅ AI model trained & saved as 'fraud_model.pkl'")
