import os
import requests
from dotenv import load_dotenv


load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Hardcoded for now because OPENROUTER_MODEL from .env
# is causing problems.
MODEL = "meta-llama/llama-3.1-8b-instruct"

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_text(prompt: str, system_prompt: str) -> str:
    print("\n========================================")
    print("🧠 OPENROUTER REQUEST")
    print("========================================")

    # Check API key
    if not OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY is missing")

    print("✅ OPENROUTER_API_KEY FOUND")
    print(f"🤖 Model: {MODEL}")

    # Check input
    if not prompt or not prompt.strip():
        raise ValueError("Prompt cannot be empty")

    print(f"📝 Prompt length: {len(prompt)} characters")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    }

    try:
        print("📡 Sending request to OpenRouter...")

        response = requests.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload,
            timeout=60,
        )

        print("✅ OpenRouter responded")
        print(f"📡 Status Code: {response.status_code}")
        print(f"📦 Response Size: {len(response.content)} bytes")

    except requests.exceptions.Timeout:
        print("⏰ OPENROUTER TIMEOUT")
        raise ValueError("OpenRouter request timed out")

    except requests.exceptions.RequestException as error:
        print("❌ OPENROUTER NETWORK ERROR")
        print(f"❌ Error type: {type(error).__name__}")
        print(f"❌ Error: {error}")

        raise ValueError("Could not connect to OpenRouter")

    # Handle API errors
    if response.status_code != 200:
        print("\n========================================")
        print("❌ OPENROUTER API ERROR")
        print("========================================")
        print(f"📡 Status: {response.status_code}")
        print(f"📄 Response: {response.text[:1000]}")

        raise ValueError(
            f"OpenRouter returned status code {response.status_code}"
        )

    # Parse response
    try:
        data = response.json()

        content = data["choices"][0]["message"]["content"].strip()

        if not content:
            raise ValueError("OpenRouter returned an empty response")

        print("✅ RESPONSE PARSED SUCCESSFULLY")
        print(f"📝 Response length: {len(content)} characters")
        print("========================================")

        return content

    except (KeyError, IndexError, TypeError, ValueError) as error:
        print("❌ INVALID OPENROUTER RESPONSE")
        print(f"❌ Error: {error}")
        print(f"📄 Raw response: {response.text[:1000]}")

        raise ValueError("Invalid response received from OpenRouter")