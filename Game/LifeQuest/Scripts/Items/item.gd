extends Resource
class_name ItemResource

@export var name : String
enum ItemType { CONSUMABLE, EQUIPMENT, GENERIC }
enum EquipmentLocation { HEAD, CHEST, ARMS, HANDS, LEGS, FEET} 
@export var itemType : ItemType
@export var equipLocation : EquipmentLocation
@export var damage : int = 0
@export var healthBonus : int = 0
@export var defenseBonus : int = 0
@export var magicBonus : int = 0

