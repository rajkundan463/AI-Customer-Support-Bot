import os
import json
import requests
from dotenv import load_dotenv


# Load Environment Variables

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")


# Model & Endpoint Configuration

MODEL = "models/gemini-2.5-flash"

# Correct generateContent endpoint for your model
GEMINI_URL = (
    f"https://generativelanguage.googleapis.com/v1/"
    f"{MODEL}:generateContent?key={API_KEY}"
)



# Universal Extractor for Gemini Responses

def extract_any_text(data):
    """
    Safely traverses multiple potential Gemini response formats.
    Returns a string if found; otherwise returns None.
    """
    paths = [
        ["candidates", 0, "content", "parts", 0, "text"],
        ["candidates", 0, "output_text"],
        ["candidates", 0, "content", 0, "text"],
        ["text"],
        ["candidates", 0, "message"],
        ["candidates", 0, "output"],
    ]

    for path in paths:
        try:
            ref = data
            for key in path:
                ref = ref[key]
            if isinstance(ref, str):
                return ref
        except Exception:
            continue

    return None



# Main LLM Processing Function

def generate_llm_response(user_message, session_summary, history, faq):
    """
    Core function that:
    - Builds prompt
    - Calls Gemini endpoint
    - Extracts model output
    - Cleans & parses JSON
    - Returns structured AI response
    """

    try:
        # Prepare content
        faq_text = "\n".join([f"Q: {f['q']} | A: {f['a']}" for f in faq])
        history_text = "\n".join(history)

        # Strict JSON instruction
        system_prompt = """
        You are HelpBot, an AI customer support assistant.
        You MUST respond in valid JSON format ONLY:
        {
            "answer": "",
            "confidence": 0.0,
            "actions": []
        }
        """

        # Combine final prompt
        final_prompt = f"""
        {system_prompt}

        --- SESSION SUMMARY ---
        {session_summary}

        --- HISTORY ---
        {history_text}

        --- FAQ ---
        {faq_text}

        --- USER MESSAGE ---
        {user_message}
        """

        # Gemini payload
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": final_prompt}
                    ]
                }
            ]
        }

        # Make API request
        response = requests.post(GEMINI_URL, json=payload)
        data = response.json()

        # Debug print (useful for development)
        print("RAW GEMINI RESPONSE:", json.dumps(data, indent=2))

        # Extract raw text
        model_output = extract_any_text(data)

        # If no output is found
        if not model_output:
            return {
                "answer": "Gemini did not return text.",
                "confidence": 0.3,
                "actions": ["escalate"]
            }

       
        # CLEAN JSON CODE BLOCKS (```json ... ```)
     
        cleaned = (
            model_output
            .replace("```json", "")
            .replace("```JSON", "")
            .replace("```", "")
            .strip()
        )


        # Parse cleaned JSON output

        try:
            return json.loads(cleaned)
        except Exception:
            # If model returned plain text instead of JSON
            return {
                "answer": cleaned,
                "confidence": 0.8,
                "actions": []
            }

    except Exception as e:
        print("Gemini Error:", e)
        return {
            "answer": "Gemini service failed. Escalating...",
            "confidence": 0.2,
            "actions": ["escalate"]
        }
