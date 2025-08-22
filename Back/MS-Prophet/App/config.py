from pydantic import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str
    APP_PORT: int
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    OPENWEATHER_API_KEY: str
    OPENWEATHER_CITY_ID: int

    class Config:
        env_file = ".env"

settings = Settings()
