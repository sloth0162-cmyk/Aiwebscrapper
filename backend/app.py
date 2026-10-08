from flask import Flask, jsonify, request
from flask_cors import CORS

from ai_summaries import summarize_url, rewrite_text


app = Flask(__name__)

# Allow requests from the React frontend
CORS(app)


@app.get("/")
def home():
    return jsonify({
        "message": "AI Web Scraper API is running"
    })


@app.post("/api/summarize")
def summarize():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required"
            }), 400

        url = data.get("url", "").strip()

        if not url:
            return jsonify({
                "error": "URL is required"
            }), 400

        print("\n========================================")
        print("📥 SUMMARIZE REQUEST")
        print("========================================")
        print(f"🔗 URL: {url}")

        result = summarize_url(url)

        print("✅ SUMMARIZE REQUEST COMPLETE")
        print("========================================")

        return jsonify(result), 200

    except ValueError as error:
        print(f"❌ Validation error: {error}")

        return jsonify({
            "error": str(error)
        }), 400

    except Exception as error:
        print("❌ SUMMARIZE ERROR")
        print(f"❌ Error type: {type(error).__name__}")
        print(f"❌ Error: {error}")

        return jsonify({
            "error": "Failed to summarize the webpage"
        }), 500


@app.post("/api/rewrite")
def rewrite():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required"
            }), 400

        text = data.get("text", "").strip()
        style = data.get("style", "professional").strip().lower()

        if not text:
            return jsonify({
                "error": "Text is required"
            }), 400

        print("\n========================================")
        print("📥 REWRITE REQUEST")
        print("========================================")
        print(f"🎨 Style: {style}")

        rewritten = rewrite_text(
            text=text,
            style=style,
        )

        print("✅ REWRITE REQUEST COMPLETE")
        print("========================================")

        return jsonify({
            "rewritten": rewritten,
            "style": style,
        }), 200

    except ValueError as error:
        print(f"❌ Validation error: {error}")

        return jsonify({
            "error": str(error)
        }), 400

    except Exception as error:
        print("❌ REWRITE ERROR")
        print(f"❌ Error type: {type(error).__name__}")
        print(f"❌ Error: {error}")

        return jsonify({
            "error": "Failed to rewrite the text"
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False,
    )