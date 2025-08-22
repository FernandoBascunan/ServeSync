import requests
import pandas as pd
from App.config import settings

def obtener_clima_futuro(dias: int):
    url = f"http://api.openweathermap.org/data/2.5/forecast?id={settings.OPENWEATHER_CITY_ID}&appid={settings.OPENWEATHER_API_KEY}&units=metric&lang=es"
    r = requests.get(url)
    data = r.json()

    clima = []
    for entrada in data["list"][:dias*8]: # 8 registros por día
        clima.append({
            "ds": entrada["dt_txt"].split(" ")[0],
            "temp": entrada["main"]["temp"]
        })
    
    df = pd.DataFrame(clima)
    return df
