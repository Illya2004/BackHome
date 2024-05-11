from pydantic_settings import BaseSettings, SettingsConfigDict

class AppSettings(BaseSettings):
    APP_SECRET_KEY: str
    DOMAIN_NAME: str

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


class MailConfig(BaseSettings):
    SMTP_SERVER: str
    SMTP_PORT: int
    HOST_EMAIL: str
    EMAIL_PASS: str

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


class DbConfig(BaseSettings):
    DB_NAME: str
    DB_USER: str
    DB_HOST: str
    DB_PASSWORD: str
    DB_PORT: int

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


settings = AppSettings()
db_config = DbConfig()
mail_config = MailConfig()
