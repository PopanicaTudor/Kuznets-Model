import requests
import pandas as pd

# Definim codurile indicatorilor de la World Bank API
indicators = {
    'GDP per capita': 'NY.GDP.PCAP.CD',
    'GDP growth rate': 'NY.GDP.MKTP.KD.ZG',
    'Urban population percentage': 'SP.URB.TOTL.IN.ZS',
    'Literacy rate': 'SE.ADT.LITR.ZS',
    'Environmental performance index': 'AG.LND.FRST.ZS',  # alternativă pentru EPI, % forest cover
    'CO2 emissions': 'EN.GHG.CO2.PC.CE.AR5'  # Emisii totale de CO2 (kilotone)
}

# Setăm intervalul de ani
years = '1960:2020'

# URL de bază al API-ului Băncii Mondiale
url_base = 'http://api.worldbank.org/v2/country/all/indicator/'

# Inițializăm un DataFrame gol pentru a colecta datele
country_data = pd.DataFrame()

# Iterăm prin fiecare indicator pentru a colecta date
for name, indicator_code in indicators.items():
    url = f"{url_base}{indicator_code}?date={years}&format=json&per_page=20000"
    response = requests.get(url)
    data = response.json()

    # Extragem informațiile pentru fiecare țară
    rows = []
    if len(data) > 1:
        for entry in data[1]:
            if entry['value'] is not None:
                rows.append({
                    'Country Code': entry['country']['id'],
                    'Year': int(entry['date']),
                    name: entry['value']
                })
                
    # Convertim lista în DataFrame și verificăm dacă are coloanele necesare
    df = pd.DataFrame(rows)
    if not df.empty and 'Country Code' in df.columns and 'Year' in df.columns:
        if country_data.empty:
            country_data = df
        else:
            country_data = pd.merge(country_data, df, on=['Country Code', 'Year'], how='outer')
    else:
        print(f"Nu au fost găsite date pentru indicatorul: {name}")

# Calculăm anii trecuți de la cel mai vechi an de date pentru fiecare țară
if not country_data.empty:
    # Eliminăm rândurile incomplete pentru calcul (valori NaN pe toți indicatorii)
    country_data.dropna(how='any', inplace=True)

    # Găsim anul cel mai vechi pentru fiecare țară (doar rânduri valide)
    min_years = country_data.groupby('Country Code')['Year'].transform('min')

    # Calculăm "Years Since First Data" pentru fiecare rând
    country_data['Years Since First Data'] = country_data['Year'] - min_years

    # Numărăm câte date valide are fiecare țară
    country_data['Valid Data Count'] = country_data.groupby('Country Code')['Year'].transform('count')

    # Filtrăm țările care au mai mult de 15 date valide
    country_data = country_data[country_data['Valid Data Count'] > 15]

    # Eliminăm coloana auxiliară "Valid Data Count"
    country_data.drop(columns=['Valid Data Count'], inplace=True)

    # Salvăm rezultatele într-un fișier CSV
    country_data.to_csv('data/ekc_data.csv', index=False)
    print("Fișierul CSV a fost generat cu succes cu datele corect calculate!")
else:
    print("Nu au fost colectate date suficiente.")

