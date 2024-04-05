extends Node2D
var itemname # variable for the items name
var itemquantity # variable for the items quantity, amount of stacked items



func _ready():
	# Ensure that $TextureRect exists and is a TextureRect node
	if $TextureRect:
		if randi() % 2 == 0:
			itemname = "Iron Sword"
		else:
			itemname = "Wooden Sword"

	#To set the equipment texture
	$TextureRect.texture = load("res://Sprites/Equipment Icons/" + itemname + ".png")
	#var to set the stack size of each item
	var stacksize = int(Jsonitems.itemdata[itemname]["StackSize"])
	
	#test:
	itemquantity = randi() % stacksize +1
	
	
	#for the non-stacking items we do not need to show label amount
	if stacksize == 1:
		$Label.visible = false
	else:
		$Label.text = str(itemquantity)


#add and combine or split inventory items
func addquantity(amount):
	itemquantity += amount
	$Label.text = String(itemquantity)
	
func decreasequantity(amount):
	itemquantity -= amount
	$Label.text = String(itemquantity)
