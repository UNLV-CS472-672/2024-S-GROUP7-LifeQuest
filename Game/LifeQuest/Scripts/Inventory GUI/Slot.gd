extends Panel

var defaulttexture: Texture
var emptytexture: Texture

# To access the item class vars
var ItemScene: PackedScene = preload("res://Scripts/Inventory GUI/Item.tscn")
var item: Node2D = null


enum SlotType {
	INVENTROY,
	HEAD,
	PANTS,
	HANDS,
	SHOES,
	WEAPON,
	ACCESSORY,
}

var slotType = null

func _ready():
	defaulttexture = preload("res://Sprites/Equipment Icons/full inventory slot.png")
	emptytexture = preload("res://Sprites/Equipment Icons/empty inventory slot.png")
	#if randi() % 2 == 0:
		#item = ItemScene.instantiate() 
		#add_child(item)
	#refresh()
	
#does not change slots TODO not a big part of functionality visual thing:
func refresh():
	if item == null:
		set("theme_override_styles/panel",emptytexture)
		#print("slot empty")
	else:
		set("theme_override_styles/panel",defaulttexture)
		#print("slot full")
		
		
#to pick up items from the slot fuction
func pickslot():
	if item: #if there is an item
		remove_child(item) #pick up/ remove
		var inventoryNode = find_parent("Inventory")
		if inventoryNode:
			inventoryNode.add_child(item)
		item = null
		refresh()

func putslot(newitem):
	if newitem:
		item = newitem
		item.position = Vector2(0, 0)
		var inventoryNode = find_parent("Inventory")
		if inventoryNode:
			inventoryNode.remove_child(item)
		add_child(item)
		refresh()

func initializeitem(itemname, itemquantity):
	#print("item name:", itemname)
	#print("item quantity:", itemquantity)
	#check for null and if so then make an instance
	if item == null:
		item = ItemScene.instantiate()
		add_child(item) 
		item.setitem(itemname,itemquantity)#function of item
	else:
		item.setitem(itemname,itemquantity)
	refresh()
