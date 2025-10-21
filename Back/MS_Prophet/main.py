from fastapi import FastAPI
from typing import List
import pandas as pd
from model_manager import ModelManager
from schemas import PredictRequest, StockRecommendRequest
from prophet import Prophet
from datetime import datetime, timedelta

app = FastAPI()
manager = ModelManager()
models = {}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predictProduct")
def predict_product(req: PredictRequest):
    try:
        # 1️⃣ Convertir explícitamente los objetos Pydantic a diccionarios
        history_data = [{"ds": h.ds, "y": h.y} for h in req.history]
        history_df = pd.DataFrame(history_data)
        
        if history_df.empty:
            return {"error": "No hay datos históricos válidos"}

        # 2️⃣ Asegurar que las columnas existen
        if 'ds' not in history_df.columns or 'y' not in history_df.columns:
            return {"error": "Formato de datos inválido. Se requieren columnas 'ds' y 'y'"}

        # 3️⃣ Convertir tipos de datos
        history_df['ds'] = pd.to_datetime(history_df['ds'])
        history_df['y'] = pd.to_numeric(history_df['y'], errors='coerce')
        
        # Remover filas con NaN
        history_df = history_df.dropna()
        
        if history_df.empty:
            return {"error": "No hay datos válidos después del procesamiento"}

        # 4️⃣ Entrenar o cargar modelo
        model_key = f"{req.company_id}_{req.product_id}"
        if model_key in models:
            model = models[model_key]
        else:
            model = Prophet(daily_seasonality=True)
            model.add_country_holidays(country_name='US')
            model.fit(history_df)
            models[model_key] = model

        # 5️⃣ Generar predicción
        today = pd.Timestamp(datetime.today().date())
        future_dates = pd.DataFrame({
            'ds': [today + timedelta(days=i) for i in range(1, req.horizon_days + 1)]
        })

        forecast = model.predict(future_dates)
        forecast_result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].copy()
        forecast_result['ds'] = forecast_result['ds'].dt.strftime("%Y-%m-%d")

        return {"forecast": forecast_result.to_dict(orient='records')}

    except Exception as e:
        print(f"Error en /predictProduct: {str(e)}")
        return {"error": str(e)}

@app.post("/stockRecommend")
def stock_recommend(req: List[StockRecommendRequest]):
    results = []
    for r in req:
        try:
            model_name = f"{r.company_id}_{r.product_id}"

            # Entrenar si no existe modelo
            if not manager.load_model(model_name):
                # Convertir explícitamente a diccionarios
                history_data = [{"ds": h.ds, "y": h.y} for h in r.history]
                data = pd.DataFrame(history_data)
                manager.train_model(model_name, data)
                manager.save_model(model_name)

            # Predecir y recomendar stock
            recommendation = manager.recommend_stock(
                model_name,
                r.horizon_days,
                r.current_stock,
                r.lead_time_days
            )

            results.append({
                "company_id": r.company_id,
                "product_id": r.product_id,
                "recommendation": recommendation
            })
        except Exception as e:
            print(f"Error procesando producto {r.product_id}: {str(e)}")
            results.append({
                "company_id": r.company_id,
                "product_id": r.product_id,
                "error": str(e)
            })

    return {"recommendations": results}