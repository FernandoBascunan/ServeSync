from prophet import Prophet
import pandas as pd

def predecir_producto(df_ventas: pd.DataFrame, dias_a_predecir: int, df_clima: pd.DataFrame = None):
    modelo = Prophet()

    if df_clima is not None:
        df_ventas = df_ventas.merge(df_clima, on="ds", how="left")
        modelo.add_regressor("temp")

    modelo.fit(df_ventas)

    futuro = modelo.make_future_dataframe(periods=dias_a_predecir)
    if df_clima is not None:
        futuro = futuro.merge(df_clima, on="ds", how="left")

    forecast = modelo.predict(futuro)
    return forecast