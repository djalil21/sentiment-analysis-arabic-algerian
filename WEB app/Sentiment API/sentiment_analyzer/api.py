from typing import Dict

from fastapi import Depends, FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .classifier.model import Model, get_model

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Add your frontend URL here
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class SentimentRequest(BaseModel):
    text: str


class SentimentResponse(BaseModel):
    probabilities: Dict[str, float]
    sentiment: str
    confidence: float


@app.post("/predict", response_model=SentimentResponse)
def predict(request: SentimentRequest, model: Model = Depends(get_model)):
    sentiment, confidence, probabilities = model.predict(request.text)
    return SentimentResponse(sentiment=sentiment, confidence=confidence, probabilities=probabilities)
