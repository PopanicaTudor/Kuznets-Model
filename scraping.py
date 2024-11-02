import requests
import pandas as pd

# Dictionary for indicator names and units of measurement
indicator_details = {
    "EN.GHG.CO2.PC.CE.AR5": "CO2 emissions (metric tons per capita)",
    "EN.ATM.PM25.MC.M3": "PM2.5 air pollution (micrograms per cubic meter)",
    "EN.GHG.ALL.PC.CE.AR5": "Greenhouse gas emissions (metric tons per capita)",
    "ER.H2O.FWTL.K3": "Biodiversity loss (km³ of freshwater per year)"
}

# Function to get country data from the World Bank API
def get_country_data(country, indicators):
    # World Bank API base URL
    base_url = "http://api.worldbank.org/v2/country/{}/indicator/{}?format=json&date=1960:2100&per_page=100"

    # Extract data for each indicator
    data_frames = []  # List to store data from each indicator
    for indicator, name in indicators.items():
        # Make a request to the API for each indicator
        response = requests.get(base_url.format(country, indicator))

        # Check if the server response is valid (status code 200)
        if response.status_code == 200:
            try:
                # Extract JSON data from the response
                data = response.json()
                # Check if the list contains at least two elements and if the second element is a list (where the actual data is)
                if len(data) > 1 and isinstance(data[1], list):
                    data = data[1]

                    # Create a DataFrame from the extracted data for the current indicator
                    df = pd.DataFrame({
                        "year": [entry["date"] for entry in data],  # Years
                        name: [entry["value"] for entry in data]  # Indicator values (e.g., GDP or emissions)
                    })
                    data_frames.append(df)  # Add the DataFrame to the list
                else:
                    print(f"No data available for indicator: {name}")
            except ValueError:
                print(f"Error decoding JSON for indicator: {name}")
        else:
            print(f"Connection error: {response.status_code} for indicator {name}")

    # If we have data for both indicators, combine them
    if len(data_frames) == 2:
        # Merge the two DataFrames based on the year
        final_df = pd.merge(data_frames[0], data_frames[1], on="year")
        final_df.dropna(inplace=True)
        final_df.sort_values(by="year", inplace=True)
        # Save the final data to a CSV file
        final_df.to_csv("output.csv", index=False)
        print("Data saved to output.csv")
        print("Columns in output.csv:", final_df.columns)
    else:
        print("Insufficient data to create the final DataFrame.")