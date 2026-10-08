from llm import generate_text
from scrapper import scrape_url


SUMMARY_PROMPT = """
You are an expert web content summarizer.

Read the provided webpage content and create a concise, accurate summary.

Rules:
- Use only information from the provided content.
- Do not invent facts.
- Focus on the main points.
- Remove unnecessary repetition.
- Make the result easy to read.
- Keep the summary reasonably short.
- Do not mention that you are an AI.
- Do not say phrases like "the article discusses" or "this webpage talks about".
"""


REWRITE_PROMPT = """
You are an expert writing assistant.

Rewrite the provided text according to the requested style.

Rules:
- Preserve the original meaning.
- Do not invent new facts.
- Do not remove important information.
- Return only the rewritten text.
"""


def summarize_url(url: str) -> dict:
    """
    Scrape a webpage and generate an AI summary.
    """

    print("\n========================================")
    print("🧠 SUMMARIZER START")
    print("========================================")

    scraped = scrape_url(url)

    print(f"📝 Scraped content: {len(scraped['content'])} characters")

    prompt = f"""
Webpage title:
{scraped["title"]}

Webpage content:
{scraped["content"]}

Create a concise summary of this webpage.
"""

    try:
        summary = generate_text(
            prompt=prompt,
            system_prompt=SUMMARY_PROMPT,
        )

        if not summary:
            raise ValueError("AI returned an empty summary")

        print("✅ SUMMARY GENERATED")
        print(f"📝 Summary length: {len(summary)} characters")
        print("========================================")

        return {
            "url": scraped["url"],
            "title": scraped["title"],
            "summary": summary,
        }

    except Exception as error:
        print("❌ SUMMARIZER FAILED")
        print(f"❌ Error type: {type(error).__name__}")
        print(f"❌ Error: {error}")

        raise ValueError("Failed to generate summary")


def rewrite_text(text: str, style: str = "professional") -> str:
    """
    Rewrite text using AI according to the requested style.
    """

    if not text or not text.strip():
        raise ValueError("Text cannot be empty")

    styles = {
        "simple": """
Rewrite using simple language that is easy for anyone to understand.
""",

        "professional": """
Rewrite using clear, polished, professional language.
""",

        "shorter": """
Make the text shorter while keeping the most important information.
""",

        "detailed": """
Make the explanation more detailed while preserving the original meaning.
""",
    }

    style_instruction = styles.get(
        style.lower(),
        styles["professional"],
    )

    prompt = f"""
Original text:

{text}

Requested writing style:

{style_instruction}

Rewrite the text now.
"""

    print("\n========================================")
    print("✍️ AI REWRITE START")
    print("========================================")
    print(f"📝 Input length: {len(text)} characters")
    print(f"🎨 Style: {style}")

    try:
        rewritten = generate_text(
            prompt=prompt,
            system_prompt=REWRITE_PROMPT,
        )

        if not rewritten:
            raise ValueError("AI returned an empty rewritten response")

        print("✅ REWRITE GENERATED")
        print(f"📝 Rewrite length: {len(rewritten)} characters")
        print("========================================")

        return rewritten

    except Exception as error:
        print("❌ REWRITE FAILED")
        print(f"❌ Error type: {type(error).__name__}")
        print(f"❌ Error: {error}")

        raise ValueError("Failed to rewrite text")