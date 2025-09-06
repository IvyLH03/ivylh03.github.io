from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from api.status import status_bp
from api.notes import notes_bp

load_dotenv()
app = Flask(__name__)
CORS(app)

app.register_blueprint(status_bp, url_prefix='/status')
app.register_blueprint(notes_bp, url_prefix='/notes')

app.run(debug=True)