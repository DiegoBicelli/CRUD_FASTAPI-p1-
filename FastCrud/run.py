from connection import DBConnectionHandler
from item_repository import itemRepository
from models import Item

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
print(db_connection)