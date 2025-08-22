# app/services/db_service.py
import pandas as pd
from sqlalchemy import create_engine
from app.config import settings  # asumiendo que usas pydantic para config

engine = create_engine(f'mysql+pymysql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}')

def obtener_ventas_historicas(producto_id: int) -> pd.DataFrame:
    query = """
    SELECT fecha_venta AS ds, cantidad_vendida AS y, precio, stock, promocion
    FROM ventas
    WHERE producto_id = :producto_id
    ORDER BY fecha_venta
    """
    df = pd.read_sql(query, engine, params={"producto_id": producto_id})
    df["ds"] = pd.to_datetime(df["ds"])
    return df
