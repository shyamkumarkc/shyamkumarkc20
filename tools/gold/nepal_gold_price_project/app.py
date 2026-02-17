
from flask import Flask, jsonify, render_template
import requests, re
from bs4 import BeautifulSoup
from datetime import datetime

app = Flask(__name__)
URL = "https://fenegosida.org/"

def scrape():
    try:
        r = requests.get(URL, timeout=15)
        soup = BeautifulSoup(r.text,"html.parser")
        txt = soup.get_text(" ",strip=True)

        def find(label):
            m = re.search(label+r".*?([\d,]+\.?\d*)", txt, re.I)
            return m.group(1) if m else "N/A"

        return {
            "fine": find("Fine Gold"),
            "tejabi": find("Tejabi Gold"),
            "silver": find("Silver"),
            "time": datetime.now().strftime("%d %b %Y %I:%M:%S %p")
        }
    except Exception as e:
        return {"error":str(e)}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api")
def api():
    return jsonify(scrape())

if __name__ == "__main__":
    app.run(debug=True)
