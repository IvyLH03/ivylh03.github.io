from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

# association table
note_label = Table(
    "note_label",
    Base.metadata,
    Column("note_id", Integer, ForeignKey("notes.id"), primary_key=True),
    Column("label_id", Integer, ForeignKey("labels.id"), primary_key=True),
)

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.now())
    visibility = Column(Boolean, default=True) 

    labels = relationship("Label", secondary=note_label, back_populates="notes")

class Label(Base):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)

    notes = relationship("Note", secondary=note_label, back_populates="labels")


# Blog post model (keep migration consistent)
"""
`
    create table if not exists blog (
      id serial primary key,
      title text,
      content text,
      created_at timestamp default now()
    )
  `"""
class BlogPost(Base):
    __tablename__ = "blog"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now())