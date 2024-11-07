from flask import Flask
from app.sentiment.routes import sentiment_bp

def create_app():
    app = Flask(__name__)
    
    # Registro del blueprint
    app.register_blueprint(sentiment_bp, url_prefix='/')

    return app
