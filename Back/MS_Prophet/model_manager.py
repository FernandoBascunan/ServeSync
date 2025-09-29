# App/models_manager.py
import os
import pickle
import pandas as pd
from prophet import Prophet
from firebase_utils import upload_model, download_model

class ModelManager:
    def __init__(self):
        self.local_dir = "models"
        os.makedirs(self.local_dir, exist_ok=True)
        self.models = {}

    def get_local_path(self, model_name):
        return os.path.join(self.local_dir, f"{model_name}.pkl")

    def load_model(self, model_name: str) -> bool:
        local_path = self.get_local_path(model_name)
        try:
            download_model(model_name, local_path)
            with open(local_path, "rb") as f:
                self.models[model_name] = pickle.load(f)
            return True
        except Exception as e:
            print(f"Modelo {model_name} no existe o error al descargar: {e}")
            return False

    def save_model(self, model_name: str):
        if model_name not in self.models:
            raise ValueError(f"No hay modelo en memoria con nombre {model_name}")
        local_path = self.get_local_path(model_name)
        with open(local_path, "wb") as f:
            pickle.dump(self.models[model_name], f)
        upload_model(local_path, model_name)

    def train_model(self, model_name: str, data: pd.DataFrame):
        model = Prophet(daily_seasonality=True)
        model.fit(data)
        self.models[model_name] = model
        print(f"Modelo {model_name} entrenado y guardado en memoria.")

    def predict(self, model_name: str, horizon_days: int, events: pd.DataFrame = None) -> pd.DataFrame:
        if model_name not in self.models:
            raise ValueError(f"Modelo {model_name} no cargado")
        model = self.models[model_name]
        future = model.make_future_dataframe(periods=horizon_days)
        if events is not None:
            future = pd.concat([future, events], axis=0)
        forecast = model.predict(future)
        return forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]]

    def recommend_stock(self, model_name: str, horizon_days: int, current_stock: float, lead_time_days: int) -> dict:
        forecast = self.predict(model_name, horizon_days)
        # Demanda durante lead time
        lead_time_demand = forecast.head(lead_time_days)["yhat"].sum()
        # Demanda futura total
        future_demand = forecast["yhat"].sum()
        # Recomendación
        recommended_order = max(0, future_demand - current_stock)
        return {
            "product_id": model_name,
            "current_stock": current_stock,
            "horizon_days": horizon_days,
            "lead_time_days": lead_time_days,
            "lead_time_demand": round(lead_time_demand, 2),
            "future_demand": round(future_demand, 2),
            "recommended_order": round(recommended_order, 2)
        }
