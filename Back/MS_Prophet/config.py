import os

# Configuración de directorios
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Crear directorio de modelos si no existe
os.makedirs(MODELS_DIR, exist_ok=True)

print(f"📁 Directorio de modelos: {MODELS_DIR}")