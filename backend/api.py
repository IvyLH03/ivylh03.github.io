from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import os
from dotenv import load_dotenv
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from models import db, BlogData, BlogContent

load_dotenv()
url = os.getenv("DATABASE_URL")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

# status for card
@app.route('/status', methods=['GET'])
def get_status():
    try:
        return jsonify({
            "currentStatus":{
            "status":"Hello",
            "starttime":time.time() * 1000
        }})
    except Exception as e:
        return f"Error: {e}"
    
# get lists of blogs
@app.route('/blogs', methods=['GET'])
def get_blog_lists():
    try:
        # return jsonify([{"title": "hello", "time": "1970-01-01", "id":"1"}])
        blog_posts = BlogData.query.all()

        response = []
        for post in blog_posts:
            response.append({
                'id': post.id,
                'title': post.title,
                'time': post.timestamp
            })
        
        return jsonify(response)
    except Exception as e:
        return f"Error: {e}"
    
# get one blog
@app.route('/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    try:
        # return jsonify({
        #     "id":id,
        #     "title":"Hello Blogs!",
        #     "time": "1970-01-01",
        #     "content":"# Title\n\n"
        #         +"*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Praesent facilisis a augue eu laoreet. Nulla facilisis sem in ligula convallis, vel suscipit metus scelerisque. Sed dolor elit, vehicula at velit in, dictum mattis odio. Nullam consequat risus tortor, et venenatis mauris condimentum eu. Cras eu porta odio. Vivamus nec dui volutpat, dignissim orci eu, lobortis mauris. Integer consectetur magna quis ultricies placerat. Vivamus venenatis porttitor consectetur. Vestibulum rutrum lobortis arcu, condimentum fermentum sapien faucibus nec. Nulla tincidunt mi eget velit commodo, ac laoreet turpis porttitor. Proin consequat lorem lorem, non faucibus nunc euismod sit amet. In id quam sit amet risus finibus sollicitudin. Donec consequat urna ex, et dictum tellus mattis id.\n\n"
        #         +"```In hac habitasse platea dictumst. Aliquam eget mollis mauris. Etiam dapibus vitae turpis quis blandit. Proin accumsan lorem vitae lacus interdum, finibus congue odio molestie. Vivamus auctor magna lobortis velit ornare volutpat. Nulla at purus at mauris facilisis convallis eu eu est. Proin tincidunt lacus eget arcu sollicitudin, vel ultricies magna sollicitudin. Morbi interdum dictum justo vel tincidunt. Sed quis velit a orci venenatis fermentum. Donec vitae mauris tempor, finibus ligula ut, pulvinar orci. Nulla vulputate velit velit, quis lobortis leo varius nec.```\n\n"
        #         +"> Ut eleifend bibendum euismod. Quisque maximus orci in risus volutpat, at pharetra magna suscipit. Vestibulum ut suscipit odio. Sed facilisis magna in enim placerat, at eleifend lorem sodales. Sed pellentesque nibh quis purus sagittis, a volutpat lectus lobortis. Curabitur bibendum, urna quis auctor aliquet, sapien diam volutpat tortor, in efficitur quam magna a nunc. Aenean vel urna quis tellus ullamcorper egestas. Vivamus vitae dolor tristique, laoreet leo id, fermentum tellus. In ut euismod tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam faucibus vel arcu vitae dapibus. Sed nulla libero, semper vitae vestibulum a, blandit id arcu. Morbi a felis vehicula, euismod nibh a, euismod diam.\n\n"
        #         +"- Nunc ac feugiat mauris. Vestibulum consectetur diam sit amet orci tincidunt, pharetra varius nunc elementum. Nunc ut tortor non dolor pellentesque pulvinar et non neque. Donec efficitur maximus orci quis tristique. Nullam in justo orci. Pellentesque malesuada lacus vitae sem tempus gravida. Sed et purus vitae velit elementum efficitur vel eget metus. Suspendisse luctus ligula nec erat consectetur, id rutrum lacus varius. Mauris sed elit vel lorem eleifend facilisis. Vestibulum sagittis lectus ipsum, ut posuere augue dignissim et. Vestibulum dignissim porttitor ullamcorper. Nulla eu condimentum elit. Sed arcu diam, elementum at risus vulputate, fermentum tristique ante. Proin quis nunc egestas, scelerisque enim posuere, luctus risus. Quisque eget porttitor nisl. Donec accumsan accumsan orci a fringilla.\n\n"
        #         +"Nulla tempor porttitor nisi, at dictum eros accumsan et. Aenean malesuada luctus nulla, eu euismod erat ullamcorper ut. Maecenas est est, tincidunt nec ligula in, dictum auctor ex. Donec in sodales diam, egestas sollicitudin justo. Phasellus dictum nunc nec neque aliquet, vel scelerisque diam egestas. Sed rutrum purus sed gravida dignissim. Nulla lorem lorem, lobortis eu enim eu, fermentum venenatis ipsum. Nullam venenatis lobortis pharetra. Curabitur sodales nibh ligula, ac ultrices felis auctor eget."
        # })
        blog_post = BlogData.query.filter_by(id=id).first()
        if blog_post is None:
            return jsonify({'error': 'Blog post not found'}), 404
        blog_content = BlogContent.query.filter_by(blog_data_id=blog_post.id).first()
        response = {
            'id': blog_post.id,
            'title': blog_post.title,
            'time': blog_post.timestamp,
            'content': blog_content.content if blog_content else 'No content available'
        }
        return jsonify(response)

    except Exception as e:
        return f"Error: {e}"
    

# post a blog
@app.route('/blogs', methods=['POST'])
def post_blog():
    try:
        data = request.get_json()
        title = data["title"]
        posttime = time.time() * 1000
        content = data["content"]

        new_post = BlogData(title=title, timestamp=posttime)
        db.session.add(new_post)
        db.session.commit()

        new_content = BlogContent(blog_data_id=new_post.id, content=content)
        db.session.add(new_content)
        db.session.commit()

        return "Blog post and content added!"
    
    except Exception as e:
        print(e)
        return f"Error: {e}", 500