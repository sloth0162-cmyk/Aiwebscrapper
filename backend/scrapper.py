from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/154.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,"
        "application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


def validate_url(url: str) -> bool:
    try:
        parsed = urlparse(url)

        return (
            parsed.scheme in {"http", "https"}
            and bool(parsed.netloc)
        )

    except Exception:
        return False


def scrape_url(url: str) -> dict:
    if not url or not validate_url(url):
        raise ValueError("Please provide a valid URL.")

    print("\n========================================")
    print("🌐 WEB SCRAPER START")
    print("========================================")
    print(f"🔗 URL: {url}")

    try:
        response = requests.get(
            url,
            headers=HEADERS,
            timeout=(10, 30),
        )

        response.raise_for_status()

        print(f"✅ Page loaded")
        print(f"📡 Status: {response.status_code}")
        print(f"📦 HTML size: {len(response.content)} bytes")

    except requests.exceptions.ConnectTimeout:
        print("❌ Connection timeout")
        raise ValueError(
            "Could not connect to the website. "
            "Please try another URL."
        )

    except requests.exceptions.ReadTimeout:
        print("❌ Read timeout")
        raise ValueError(
            "The website took too long to respond. "
            "Please try another URL."
        )

    except requests.exceptions.RequestException as error:
        print("❌ Request failed")
        print(f"❌ {error}")

        raise ValueError(
            "Could not access this webpage."
        )

    soup = BeautifulSoup(response.text, "html.parser")

    # Remove elements that usually contain irrelevant text.
    for tag in soup.find_all([
        "script",
        "style",
        "noscript",
        "nav",
        "footer",
        "header",
        "aside",
        "form",
        "svg",
    ]):
        tag.decompose()

    # Get page title.
    title = ""

    if soup.title:
        title = soup.title.get_text(" ", strip=True)

    # Prefer article content when available.
    article = soup.find("article")

    if article:
        content = article.get_text(" ", strip=True)
    else:
        # Fall back to main content.
        main = soup.find("main")

        if main:
            content = main.get_text(" ", strip=True)
        else:
            # Final fallback: entire page body.
            body = soup.body

            if body:
                content = body.get_text(" ", strip=True)
            else:
                content = soup.get_text(" ", strip=True)

    # Clean excessive whitespace.
    content = " ".join(content.split())

    if not content:
        raise ValueError(
            "The webpage was loaded, but no readable text was found."
        )

    # Don't send an unnecessarily huge webpage to the LLM.
    content = content[:15000]

    print(f"📄 Title: {title}")
    print(f"📝 Extracted text: {len(content)} characters")
    print("✅ SCRAPING COMPLETE")
    print("========================================")

    return {
        "url": url,
        "title": title,
        "content": content,
    }