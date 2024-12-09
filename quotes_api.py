from flask import Flask, jsonify
import random

app = Flask(__name__)

# List of quotes
quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "Do not watch the clock. Do what it does. Keep going. - Sam Levenson",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
]

@app.route('/quote', methods=['GET'])
def get_random_quote():
    """Return a random quote."""
    quote = random.choice(quotes)
    return jsonify({"quote": quote})

if __name__ == '__main__':
    app.run(debug=True)
