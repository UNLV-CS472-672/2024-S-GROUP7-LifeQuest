extends Panel

var default_texture: Texture
var empty_texture: Texture

# To access the item class vars
var ItemScene: PackedScene = preload("res://Item.tscn")
var item: Node2D = null

func _ready():
	default_texture = preload("res://Sprites/Equipment Icons/full inventory slot.png")
	empty_texture = preload("res://Sprites/Equipment Icons/empty inventory slot.png")
	if randi() % 2 == 0:
		item = ItemScene.instantiate() 
		add_child(item)
	refresh()

func refresh():
	if item == null:
		#does not change slots TODO:
		set("theme_override_styles/panel",empty_texture)
		print("slot empty")
	else:
		set("theme_override_styles/panel",default_texture)
		print("slot full")
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
