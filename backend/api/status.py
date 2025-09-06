from flask import Blueprint, jsonify, request, current_app
import time


# status for card
status = "Hello"
statustime = time.time() * 1000

status_bp = Blueprint("status", __name__)

# get status
@status_bp.route('/', methods=['GET'])
def get_status():
    try:
        return jsonify({
            "currentStatus":{
            "status": status,
            "starttime": statustime
        }})
    except Exception as e:
        return f"Error: {e}"

# post status   
@status_bp.route('/', methods=['POST'])
def post_status():
    global status, statustime
    try:
        data = request.get_json()
        status = data["status"]
        statustime = time.time() * 1000
        upload_password = data["uploadPassword"]
        if upload_password != current_app.config.get("UPLOAD_PASSWORD"):
            return "Unauthorized", 401
    except Exception as e:
        return f"Error: {e}", 500
    
    return jsonify({
        "currentStatus":{
            "status": status,
            "starttime": statustime
        }}), 200
        