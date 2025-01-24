from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy object
db = SQLAlchemy()

# Define the BlogData model
class BlogData(db.Model):
    __tablename__ = 'blog_data'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.BigInteger, nullable=False)

    # One-to-one relationship with blog_content
    content = db.relationship('BlogContent', backref='blog_data', uselist=False)

# Define the BlogContent model
class BlogContent(db.Model):
    __tablename__ = 'blog_content'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    blog_data_id = db.Column(db.Integer, db.ForeignKey('blog_data.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
