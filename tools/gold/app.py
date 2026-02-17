from flask import Flask, jsonify, render_template
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime

app = Flask(__name__)

URL = "https://fenegosida.org/"

def extract_prices():
    try:
        r = requests.get(URL, timeout=10)
        soup = BeautifulSoup(r.text, "html.parser")
        text = soup.get_text(" ", strip=True)

        # regex extraction
        fine = re.search(r"Fine Gold.*?([\d,]+)", text, re.I)
        tejabi = re.search(r"Tejabi Gold.*?([\d,]+)", text, re.I)
        silver = re.search(r"Silver.*?([\d,]+\.?\d*)", text, re.I)

        return {
            "fine_gold": fine.group(1) if fine else "N/A",
            "tejabi_gold": tejabi.group(1) if tejabi else "N/A",
            "silver": silver.group(1) if silver else "N/A",
            "updated": datetime.now().strftime("%d %B %Y %I:%M:%S %p")
        }
    except Exception as e:
        return {"error": str(e)}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api")
def api():
    return jsonify(extract_prices())

if __name__ == "__main__":
    app.run(debug=True)
