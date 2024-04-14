extends Node2D
var itemname # variable for the items name
var itemquantity # variable for the items quantity, amount of items



func _ready():
	pass


#add and combine or split inventory items
func addquantity(amount):
	itemquantity += amount
	$Label.text = str(itemquantity)
	
func decreasequantity(amount):
	itemquantity -= amount
	$Label.text = str(itemquantity)

func setitem(itemname2,itemquantity2):
	var item = ItemDatabase.get_item(itemname2)
	itemname = itemname2
	itemquantity = itemquantity2
	#$TextureRect.texture = load("res://Sprites/Equipment Icons/" + itemname + ".png")
	
	$TextureRect.texture = item.icon
	#var stacksize = int(Jsonitems.itemdata[itemname]["StackSize"])

	var stacksize = item.max_stack_size
	#print("stacksize:",stacksize)
	#print("items:",item.name)

	#var stacksize = int(item.max_stack_size)
	if stacksize == 1:
		$Label.visible = false
	else:
		$Label.text = str(itemquantity)
	
	
