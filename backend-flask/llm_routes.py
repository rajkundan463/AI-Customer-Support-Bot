from flask import Blueprint, request, jsonify
from services.llm_client import generate_llm_response

llm_bp = Blueprint("llm", __name__)

@llm_bp.post("/generate")
def generate():
    data = request.get_json()

    result = generate_llm_response(
        user_message=data.get("user_message", ""),
        session_summary=data.get("session_summary", ""),
        history=data.get("history", []),
        faq=data.get("faq", [])
    )

    return jsonify(result)
