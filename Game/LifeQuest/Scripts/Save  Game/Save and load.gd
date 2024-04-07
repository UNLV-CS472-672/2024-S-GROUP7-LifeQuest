extends Node

#potential later refrences for player health and other stats
#@onready var player = 



func save_game():
	var saved_game:SaveGame = SaveGame.new()
	
	saved_game.inventory = PlayerInventory.inventory
	saved_game.equip = PlayerInventory.equip
	ResourceSaver.save(saved_game,"user://LifeQuestsave.tres")
	
func load_game():
	var saved_game:SaveGame = load("user://LifeQuestsave.tres") as SaveGame
	if saved_game != null:
		#print("load_game is running")
		PlayerInventory.equip = saved_game.equip
		PlayerInventory.inventory = saved_game.inventory
		return true
	else:
		return false
