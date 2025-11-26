from flask import Flask
from llm_routes import llm_bp
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
app.register_blueprint(llm_bp)

@app.get("/")
def home():
    return {"status": "Gemini LLM Service Running ✔"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
