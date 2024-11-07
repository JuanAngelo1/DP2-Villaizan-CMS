from flask import Blueprint, request, jsonify
from app.sentiment.model import classify_sentiment

sentiment_bp = Blueprint('sentiment_bp', __name__)

@sentiment_bp.route('/clasificar-sentimiento', methods=['POST'])
def classify_comment():
    data = request.json
    comment = data.get("comentario", "")
    result = classify_sentiment(comment)
    return jsonify(result)
