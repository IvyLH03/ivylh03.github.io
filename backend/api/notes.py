from flask import Blueprint, jsonify, request, current_app
from features.notes.crud import get_all_notes, get_all_visible_notes, create_note, update_note, delete_note, get_notes_by_labels
from features.notes.db import get_session
import os
from dotenv import load_dotenv
import traceback

notes_bp = Blueprint("notes", __name__)

# get config variables from .env
load_dotenv()
database_url = f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_DATABASE')}"
print (database_url)
upload_password = os.getenv("UPLOAD_PASSWORD")
session_maker = get_session(database_url)


# Get all notes
@notes_bp.route('/all', methods=['POST'])
def get_all_notes_api():
  try:
      # Check argument for visibility filter
      get_private = request.args.get('include_private', False, bool)
      if get_private:
        # check upload password
        if request.form.get("uploadPassword")!= upload_password:
            return "Unauthorized", 401
        notes = get_all_notes(session_maker())
        return jsonify([note.to_dict() for note in notes]), 200
      else:
        notes = get_all_visible_notes(session_maker())
        return jsonify([note.to_dict() for note in notes]), 200
  except Exception as e:
      traceback.print_exc()
      return f"Error: {e}", 500


# Post a note
@notes_bp.route('/', methods=['POST'])
def create_note_api():
  try:
      data = request.get_json()
      content = data["content"]
      labels = data.get("labels", [])
      visibility = data.get("visibility", True)
      
      # Verify upload password
      if data["uploadPassword"] != upload_password:
          return "Unauthorized", 401

      new_note = create_note(content, labels, visibility)
      return jsonify(new_note.to_dict()), 201
  except Exception as e:
      return f"Error: {e}", 500

# Update a note
@notes_bp.route('/<int:note_id>', methods=['PUT'])
def update_note_api(note_id):
  try:
      data = request.get_json()
      content = data.get("content")
      labels = data.get("labels")
      visibility = data.get("visibility")
      
      # Verify upload password
      if data["uploadPassword"] != upload_password:
          return "Unauthorized", 401

      updated_note = update_note(note_id, content, labels, visibility)
      if not updated_note:
          return "Note not found", 404
      return jsonify(updated_note.to_dict()), 200
  except Exception as e:
      return f"Error: {e}", 500

# Delete a note
@notes_bp.route('/<int:note_id>', methods=['DELETE'])
def delete_note_api(note_id):
  try:
      data = request.get_json()
      
      # Verify upload password
      if data["uploadPassword"] != upload_password:
          return "Unauthorized", 401

      success = delete_note(note_id)
      if not success:
          return "Note not found", 404
      return "Note deleted", 200
  except Exception as e:
      return f"Error: {e}", 500

# Get notes by searching a set of labels
@notes_bp.route('/search', methods=['POST'])
def get_notes_by_labels_api():
  try:
      data = request.get_json()
      label_names = data["labels"]
      
      # Check argument for visibility filter
      get_private = data.get('include_private', False)
      if get_private:
        # Verify upload password
        if data["uploadPassword"] != upload_password:
            return "Unauthorized", 401
        notes = get_notes_by_labels(label_names, include_private=True)
      else:
        notes = get_notes_by_labels(label_names, include_private=False)
      
      return jsonify([note.to_dict() for note in notes]), 200
  except Exception as e:
      return f"Error: {e}", 500


