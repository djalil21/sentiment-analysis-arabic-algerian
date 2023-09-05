document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sentiment-form");
  const inputText = document.getElementById("input-text");
  const resultSentiment = document.getElementById("result-sentiment");
  const resultNegative = document.getElementById("result-negative");
  const resultNeutral = document.getElementById("result-neutral");
  const resultPositive = document.getElementById("result-positive");
  const emoji = document.getElementById("emoji");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = inputText.value;

    // Clear previous result
    resultSentiment.textContent = "";
    resultNegative.textContent = "";
    resultNeutral.textContent = "";
    resultPositive.textContent = "";
    emoji.textContent = "";

    console.log(text);
    data = {
      text: text,
    };
    // Make request to Huggingface API
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);

      if (result.sentiment === "positive") {
        resultSentiment.innerHTML = `The sentiment is: <b class="text-success">${result.sentiment}</b> &#128516;`;
      } else if (result.sentiment === "neutral") {
        resultSentiment.innerHTML = `The sentiment is: <b class="text-warning">${result.sentiment}</b> &#129300;`;
      } else {
        resultSentiment.innerHTML = `The sentiment is: <b class ="text-danger">${result.sentiment}</b> &#128545;`;
      }
      resultNegative.textContent = `Negative score: ${result.probabilities.negative.toFixed(
        4
      )}`;
      resultNeutral.textContent = `Neutral score: ${result.probabilities.neutral.toFixed(
        4
      )}`;
      resultPositive.textContent = `Positive score: ${result.probabilities.positive.toFixed(
        4
      )}`;
    } else {
      resultSentiment.textContent = "Error occurred. Please try again.";
    }
  });
});
