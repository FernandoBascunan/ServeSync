import pandas as pd
import mysql.connector
from App.config import settings

def obtener_ventas_producto(producto_id: int):
    conn = mysql.connector.connect(
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        user=settings.DB_USER,
        password=settings.DB_PASSWORD,
        database=settings.DB_NAME
    )
    query = """
        SELECT fecha_venta as ds, cantidad as y
        FROM ventas
        WHERE producto_id = %s
        ORDER BY fecha_venta
    """
    df = pd.read_sql(query, conn, params=(producto_id,))
    conn.close()
    return df

def obtener_ventas_todos():
    conn = mysql.connector.connect(
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        user=settings.DB_USER,
        password=settings.DB_PASSWORD,
        database=settings.DB_NAME
    )
    query = """
        SELECT producto_id, fecha_venta as ds, cantidad as y
        FROM ventas
        ORDER BY producto_id, fecha_venta
    """
    df = pd.read_sql(query, conn)
    conn.close()
    return df
