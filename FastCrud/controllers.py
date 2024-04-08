from typing import List, Optional
from pydantic import BaseModel, ValidationError
import uuid
import json

class Item(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    price: float
    on_offer: bool = False

def create_item(item: Item) -> Item:
    pass

def get_all_items() -> List[Item]:
    pass

def update_item(item_id: str, updated_item: Item) -> Optional[Item]:
    pass

def delete_item(item_id: str) -> dict:
    pass
    
    