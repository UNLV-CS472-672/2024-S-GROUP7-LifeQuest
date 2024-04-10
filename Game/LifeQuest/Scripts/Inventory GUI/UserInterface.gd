extends CanvasLayer
var Save = preload("res://Scripts/Save  Game/Save and load.gd")

var initialized_inventory = false
# Called when the node enters the scene tree for the first time.
func _ready():
	var Saved = Save.new()
	if(Saved.load_game()):
		$Inventory.loadinventory()
		initialized_inventory = true
		#print(PlayerInventory.inventory)
		#print("loadgame")



#function for when the I button assined as the inventory button is pressed
func _input(event):
	if event.is_action_pressed("inventory"):
		var Saved = Save.new()
		$Inventory.visible = !$Inventory.visible
		$Inventory.initializeinventory(initialized_inventory)
		initialized_inventory = true
		Saved.save_game()
		#print(PlayerInventory.inventory)



# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
	#var Saved = Save.new()
	#Saved.save_game()
