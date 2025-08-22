from fastapi import FastAPI
from App.routers import predicciones

app = FastAPI(title="MS Predicciones con Prophet")

app.include_router(predicciones.router)

@app.get("/")
def root():
    return {"mensaje": "Microservicio de predicciones funcionando"}
