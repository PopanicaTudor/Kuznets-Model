import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import argparse
import os

# Dictionary for indicator names and units of measurement
indicator_details = {
    "EN.GHG.CO2.PC.CE.AR5": "CO2 emissions (metric tons per capita)",
    "EN.ATM.PM25.MC.M3": "PM2.5 air pollution (micrograms per cubic meter)",
    "EN.GHG.ALL.PC.CE.AR5": "Greenhouse gas emissions (metric tons per capita)",
    "ER.H2O.FWTL.K3": "Biodiversity loss (km³ of freshwater per year)"
}

# Main function to generate the EKC graph
def generate_kuznets_curve(country_name, y_indicator):
    try:
        # Read data from CSV file
        data = pd.read_csv("output.csv")

        # Indicators used
        gdp_indicator = "GDP per capita, PPP (current international $)"
        y_indicator_name = indicator_details.get(y_indicator)

        if not y_indicator_name:
            raise ValueError(f"Unknown indicator: {y_indicator}")

        # Use the correct column names from the CSV to select data
        X = data[gdp_indicator].values.reshape(-1, 1)  # GDP data
        Y = data[y_indicator_name].values  # Environmental degradation indicator data

        # Create polynomial features for the data
        poly_features = PolynomialFeatures(degree=2)
        X_poly = poly_features.fit_transform(X)

        # Perform linear regression (OLS) on the data
        model = LinearRegression()
        model.fit(X_poly, Y)
        Y_pred = model.predict(X_poly)

        # Plot the graph
        plt.figure(figsize=(14, 6))
        plt.scatter(X, Y, color='blue', label='Actual data')
        plt.plot(X, Y_pred, color='red', label='Estimated curve (OLS)')
        plt.xlabel(gdp_indicator)
        plt.ylabel(y_indicator_name)
        plt.title(f'Environmental Kuznets Curve (EKC) - {country_name}')
        plt.legend()
        plt.tight_layout()

        # Save the graph to the static directory
        if not os.path.exists('static'):
            os.makedirs('static')
            print("Static directory created successfully.")

        plt.savefig('static/ekc_plot.png', bbox_inches='tight')
        print("Graph saved successfully.")

    except Exception as e:
        print(f"Error generating Kuznets curve: {e}")

# Main script to accept arguments
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate the Kuznets curve for a country.')
    parser.add_argument('country_name', type=str, help='The name of the country for which to generate the Kuznets curve')
    parser.add_argument('y_indicator', type=str, help='The indicator for the vertical axis')
    args = parser.parse_args()

    generate_kuznets_curve(args.country_name, args.y_indicator)