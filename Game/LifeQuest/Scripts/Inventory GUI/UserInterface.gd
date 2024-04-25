extends CanvasLayer
var Save = preload("res://Scripts/Save  Game/Save and load.gd")

var initialized_inventory = false
# Called when the node enters the scene tree for the first time.
func _ready():
	var Saved = Save.new()
	
	if(Saved.load_game()):
		$Inventory.loadinventory()
		initialized_inventory = true
		$QuestInterface.add_quests()
	else:
		$QuestInterface.add_quests()
		#print(PlayerInventory.inventory)
		print("loadgame not found")

func save_game_data():
	var Saved = Save.new()
	Saved.save_game()

func process_inventory_press():
	if($QuestInterface.visible):
		$QuestInterface.visible = !visible
	$Inventory.visible = !$Inventory.visible
	$Inventory.initializeinventory(initialized_inventory)
	initialized_inventory = true
	save_game_data()

#function for when the I button assined as the inventory button is pressed
func _input(event):
	if event.is_action_pressed("inventory"):
		$Inventory.visible = !$Inventory.visible
		$Inventory.initializeinventory(initialized_inventory)
		initialized_inventory = true
		save_game_data()
		#print(PlayerInventory.inventory)

func process_quest_press():
	if($Inventory.visible):
		$Inventory.visible = !visible
	$QuestInterface.visible = !$QuestInterface.visible
	$Inventory.initializeinventory(initialized_inventory)
	initialized_inventory = true
	save_game_data()
# Called every frame. 'delta' is the elapsed time since the previous frame.


func savegame():
	$Inventory.initializeinventory(initialized_inventory)
	print("savegame")
	save_game_data()
	
func _process(delta):
	pass
	#var Saved = Save.new()
	#Saved.save_game()
