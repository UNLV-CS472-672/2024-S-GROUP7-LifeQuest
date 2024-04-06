extends CanvasLayer


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

#function for when the I button assined as the inventory button is pressed
func _input(event):
	if event.is_action_pressed("inventory"):
		$Inventory.visible = !$Inventory.visible
		$Inventory.initializeinventory()




# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

