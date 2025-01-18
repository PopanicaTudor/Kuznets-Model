from flask import Flask, request, jsonify, send_from_directory
import requests
from flask_cors import CORS
import os
import webbrowser
import sys

# Adjust the static folder dynamically based on the runtime environment
if hasattr(sys, '_MEIPASS'):
    static_folder = os.path.join(sys._MEIPASS, "frontend/dist")
else:
    static_folder = "dist"

app = Flask(__name__, static_folder=static_folder)
CORS(app)  # Allow CORS for frontend access

# Function to get country data from the World Bank API
def get_country_data(country, indicators):
    base_url = "http://api.worldbank.org/v2/country/{}/indicator/{}?format=json&date=1960:2100&per_page=100"
    gdp_vector = []
    env_indicator_vector = []

    for indicator, name in indicators.items():
        response = requests.get(base_url.format(country, indicator))

        if response.status_code == 200:
            try:
                data = response.json()
                if len(data) > 1 and isinstance(data[1], list):
                    data = data[1]
                    if name == "GDP per capita, PPP (current international $)":
                        gdp_vector = [entry["value"] for entry in data if entry["value"] is not None]
                    else:
                        env_indicator_vector = [entry["value"] for entry in data if entry["value"] is not None]
            except ValueError:
                print(f"Error decoding JSON for indicator: {name}")
        else:
            print(f"Connection error: {response.status_code} for indicator {name}")

    # Sort both vectors based on GDP values in ascending order
    if gdp_vector and env_indicator_vector:
        combined = sorted(zip(gdp_vector, env_indicator_vector))
        gdp_vector, env_indicator_vector = zip(*combined)
        gdp_vector = list(gdp_vector)
        env_indicator_vector = list(env_indicator_vector)

    return gdp_vector, env_indicator_vector

# API route to fetch data
@app.route('/api/get_data', methods=['POST'])
def get_data():
    try:
        data = request.get_json()
        print(f"Received data from frontend: {data}")
        country = data['country']
        indicators = data['indicators']

        # Call the function to get country data
        gdp_vector, env_indicator_vector = get_country_data(country, indicators)

        return jsonify({'gdp_vector': gdp_vector, 'env_indicator_vector': env_indicator_vector})
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500

# Route to serve frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path:
        full_path = os.path.join(app.static_folder, path)
        if os.path.exists(full_path):
            return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# Main entry point
if __name__ == "__main__":
    # Verify the static folder exists before starting the app
    if not os.path.exists(static_folder):
        print(f"Static folder not found: {static_folder}")
        print("Please make sure the 'dist' folder is present when running locally.")
        sys.exit(1)

    # Start the Flask app
    port = 5000
    url = f"http://127.0.0.1:{port}"
    print(f"Opening browser at {url}...")
    webbrowser.open(url)  # Open the browser automatically
    app.run(host="0.0.0.0", port=port)
