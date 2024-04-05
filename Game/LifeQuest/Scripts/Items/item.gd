extends Resource
class_name ItemResource

@export var name : String
@export_multiline var description : String
@export var stackable : bool = false
@export var max_stack_size : int = 1


enum ItemType { CONSUMABLE, EQUIPMENT, GENERIC }
enum EquipmentLocation {INVENTORY,HEAD,PANTS,HANDS,SHOES,WEAPON,ACCESSORY,} 
@export var itemType : ItemType
@export var equipLocation : EquipmentLocation
@export var damage : int = 0
@export var healthBonus : int = 0
@export var defenseBonus : int = 0
@export var magicBonus : int = 0
# Sprite properties 
@export var icon : Texture
 
