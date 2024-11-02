from flask import Flask, render_template, request, redirect, url_for
import scraping
import subprocess
import os

# Set the working directory to the script's location
os.chdir(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)

# List of countries and their associated codes
countries = {
    'Spain': 'ESP',
    'Portugal': 'PRT',
    'Italy': 'ITA',
    'Greece': 'GRC',
    'Romania': 'ROU'
}

@app.route('/')
def index():
    return render_template('index.html', countries=countries)

@app.route('/generate_curve', methods=['POST'])
def generate_curve():
    # Get the selected country and indicator from the user
    selected_country = request.form.get('country')
    selected_indicator = request.form.get('indicator')

    if selected_country in countries:
        country_code = countries[selected_country]

        # Call the scraping function to extract data for the selected country and indicator
        indicators = {
            "NY.GDP.PCAP.PP.CD": "GDP per capita, PPP (current international $)",
            selected_indicator: scraping.indicator_details[selected_indicator]
        }
        scraping.get_country_data(country_code, indicators)

        # Call the script to generate the Kuznets curve and save the graph as an image
        subprocess.run(["python", "Kuznets.py", selected_country, selected_indicator], check=True)

    # Redirect to the main page and display the generated graph
    return render_template('index.html', countries=countries, graph_url='static/ekc_plot.png')

if __name__ == "__main__":
    app.run(debug=True)