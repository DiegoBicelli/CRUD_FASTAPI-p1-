from fastapi import FastAPI
from models import Item, ItemSend
from controllers import create_item, get_all_items, update_item, delete_item
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from connection import DBConnectionHandler
from item_repository import itemRepository
from bson.objectid import ObjectId

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
item_Repository = itemRepository(db_connection)

app = FastAPI()
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8000",
    "http://127.0.0.1:8000/items/" 
    "http://127.0.0.1:5500/items/",
    "http://localhost:8000/",


]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.post("/items/")
async def add_item(item: ItemSend):
    return item_Repository.insert_document(item)

@app.get("/items/")
async def read_items():
    return item_Repository.select_many()

@app.get("/items/{item_id}")
async def read_one_item(item_id: str):
    return item_Repository.select_by_object_id(item_id)

@app.put("/items/{item_id}")
async def update_item_details(item_id: str, item: ItemSend):
    return item_Repository.edit_registry(item_id, item)

@app.delete("/items/{item_id}")
async def delete_item(item_id: str):
    return item_Repository.delete_registry(item_id)
