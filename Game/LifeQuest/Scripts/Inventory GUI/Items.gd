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
	
	#$TextureRect.texture = item.icon
	$TextureRect.set_texture(item.icon)
		# Calculate the maximum size for the sprite
	# Calculate the maximum size for the sprite
	var max_width = 46
	var max_height = 63

	var scale_factor = 1.0  # Default scale factor

	# Check if the texture's width or height exceeds the maximum dimensions
	var texture_width = $TextureRect.texture.get_width()
	var texture_height = $TextureRect.texture.get_height()

	if texture_width > max_width or texture_height > max_height:
		# Calculate scale factors for width and height
		var scale_factor_width = max_width / float(texture_width)
		var scale_factor_height = max_height / float(texture_height)
		
		# Choose the smaller of the two scale factors to maintain aspect ratio
		scale_factor = min(scale_factor_width, scale_factor_height)

	# Set the scale of the TextureRect
	$TextureRect.scale = Vector2(scale_factor, scale_factor)
	var stacksize = item.max_stack_size
	#print("stacksize:",stacksize)
	#print("items:",item.name)
	# Center the TextureRect

	#var stacksize = int(item.max_stack_size)
	if stacksize == 1:
		$Label.visible = false
	else:
		$Label.text = str(itemquantity)
	
	
