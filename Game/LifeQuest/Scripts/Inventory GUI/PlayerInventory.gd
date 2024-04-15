extends Node

# Preload the scripts for the slot and items
const SlotClass = preload("res://Scripts/Inventory GUI/Slot.gd")
const ItemClass = preload("res://Scripts/Inventory GUI/Items.gd")
#const for inventory slots
const INVENTORYSLOTS = 15
#initial inventory data
var inventory ={
	0: ["Iron Sword", 1],
	#1: ["Wooden Sword", 1],
	1: ["Small Health Potion", 10],
	2: ["Small Health Potion", 5],
	3: ["Large Health Potion", 5],
	#can add more starting items
}
var equip = {
	#0: [ , ],
	
	
	
}



# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
