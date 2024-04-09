from connection import DBConnectionHandler
from item_repository import itemRepository
from models import Item

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
item_Repository = itemRepository(db_connection)

documento = Item(
    id="661071ec9e75dded8d9c1e0c",
    name="Operação de Teste",
    price=10
)

print(item_Repository.insert_document(documento))