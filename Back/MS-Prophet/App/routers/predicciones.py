from fastapi import APIRouter
from datetime import datetime
from App.models.schemas import PrediccionItemRequest, PrediccionItemResponse
from App.services.db_service import obtener_ventas_producto, obtener_ventas_todos
from App.services.clima_service import obtener_clima_futuro
from App.services.prophet_service import predecir_producto

router = APIRouter(prefix="/predicciones", tags=["Predicciones"])

@router.get("/global")
def prediccion_global():
    df_todos = obtener_ventas_todos()
    resultados = []
    for producto_id in df_todos["producto_id"].unique():
        df = df_todos[df_todos["producto_id"] == producto_id].drop(columns=["producto_id"])
        clima = obtener_clima_futuro(7)
        forecast = predecir_producto(df, 7, clima)
        stock_requerido = max(0, forecast["yhat"].sum()) # lógica ejemplo
        resultados.append({
            "producto_id": producto_id,
            "stock_requerido": stock_requerido
        })
    return resultados

@router.post("/item", response_model=PrediccionItemResponse)
def prediccion_item(request: PrediccionItemRequest):
    df = obtener_ventas_producto(request.producto_id)
    dias_a_predecir = (request.fecha_objetivo - datetime.today().date()).days
    clima = obtener_clima_futuro(dias_a_predecir)
    forecast = predecir_producto(df, dias_a_predecir, clima)
    ventas_estimadas = float(forecast.tail(1)["yhat"].values[0])
    return PrediccionItemResponse(
        producto_id=request.producto_id,
        ventas_estimadas=ventas_estimadas,
        fecha=request.fecha_objetivo
    )
