from pydantic import BaseModel
from typing import List

class EventPointSchema(BaseModel):  
    ds: str
    name: str

class HistoryPoint(BaseModel):
    ds: str
    y: float


class PredictRequest(BaseModel):
    company_id: int
    product_id: str
    horizon_days: int
    history: List[HistoryPoint]  
    events: List[EventPointSchema] = []

class StockRecommendRequest(BaseModel):
    company_id: int
    product_id: str
    horizon_days: int
    current_stock: int
    lead_time_days: int
    history: List[HistoryPoint]  
    events: List[EventPointSchema] = []
