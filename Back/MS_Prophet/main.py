# App/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from model_manager import ModelManager
from schemas import PredictRequest, StockRecommendRequest
from typing import List
app = FastAPI()
manager = ModelManager()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predictProduct")
def predict_product(req: PredictRequest):
    model_name = f"{req.company_id}_{req.product_id}"

    if not manager.load_model(model_name):
        data = pd.DataFrame([{"ds": h.ds, "y": h.y} for h in req.history])
        manager.train_model(model_name, data)
        manager.save_model(model_name)

    forecast = manager.predict(model_name, req.horizon_days)
    return {"product_id": req.product_id, "forecast": forecast.to_dict(orient="records")}

@app.post("/stockRecommend")
def stock_recommend(req: List[StockRecommendRequest]):
    results = []
    for r in req:
        model_name = f"{r.company_id}_{r.product_id}"

        if not manager.load_model(model_name):
            data = pd.DataFrame([{"ds": h.ds, "y": h.y} for h in r.history])
            manager.train_model(model_name, data)
            manager.save_model(model_name)

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

    return {"recommendations": results}
