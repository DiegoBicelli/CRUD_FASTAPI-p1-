from bson.objectid import ObjectId
from typing import Dict, List
from models import Item, ItemSend
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
import json
class itemRepository:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "item"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)

    def insert_document(self, item: Item) -> dict:
        response: InsertOneResult = self.get_current_collection().insert_one(item.model_dump())
        return {
            "acknowledged": response.acknowledged,
            "inserted_id": str(response.inserted_id),
        }
    
    def insert_list_of_documents(self, list_of_documents: List[Dict]) -> List[Dict]:
        return self.get_current_collection().insert_many(list_of_documents)
    
    def select_many(self) -> dict:
        self.get_current_collection.find(filter)
        return True
    
    def select_if_property_exists(self, property: str) -> None:
        return self.get_current_collection().find({property: {"$exists": True}})
    
    def select_or(self) -> None:
        return self.get_current_collection().find({ "$or": [{ "nome": "leo" }, { "Pizza": { "$exists": True } }] })
    
    def select_by_object_id(self, id: ObjectId) -> dict:
        result = self.get_current_collection().find_one({"_id": ObjectId(id)})
        if result:
            response = {
            "id": str(result["_id"]),
            "name": result["name"],
            "price": result["price"],
            "description": result["description"]
        }
            return response
        else:
            return {}

    def edit_registry(self, id: str, data: ItemSend) -> Dict:
        response: UpdateResult = self.get_current_collection().update_one(
            {"_id": ObjectId(id)},
            {"$set": data.model_dump()}
        )
        return {
            "acknowledged": response.acknowledged,
            "matched_count": response.matched_count,
            "modified_count":response.modified_count,
            "raw_result": response.raw_result,
            "upserted_id": response.upserted_id
        }

    def edit_many_registries(self,filtro: dict, propriedades: dict) -> None:
        return self.get_current_collection.update_many(
            filtro,
            {"$set": propriedades}
        ) 

    def edit_many_increment(self, num, property: str) -> None:
        return self.get_current_collection().update_one(
            {"_id": ObjectId(id)},
            {"$inc": {property: num}}
        ) 

    def delete_many_registry(self, data: dict):
        return self.get_current_collection().delete_many(data)

    def delete_registry(self, id: str):
        response: DeleteResult = self.get_current_collection().delete_many({"_id": ObjectId(id)})
        return {
            "acknowledged": response.acknowledged,
            "deleted_count": response.deleted_count,
            "raw_result": response.raw_result,
        }