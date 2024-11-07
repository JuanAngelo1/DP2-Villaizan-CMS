from transformers import pipeline

# Cargar el modelo una sola vez
sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

def classify_sentiment(comment):
    result = sentiment_pipeline(comment)
    label = result[0]["label"]
    score = result[0]["score"]

    # Mapear las etiquetas a sentimientos
    if label in ["1 star", "2 stars"]:
        sentiment = "Negativo"
    elif label == "3 stars":
        sentiment = "Neutro"
    else:
        sentiment = "Positivo"

    return {"sentiment": sentiment, "score": score}
