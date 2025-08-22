from pydantic import BaseModel
from datetime import date

class PrediccionItemRequest(BaseModel):
    producto_id: int
    fecha_objetivo: date

class PrediccionItemResponse(BaseModel):
    producto_id: int
    ventas_estimadas: float
    fecha: date