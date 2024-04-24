extends Node

#potential later refrences for player health and other stats
#@onready var player = 



func save_game():
	var saved_game:SaveGame = SaveGame.new()
	
	saved_game.inventory = PlayerInventory.inventory
	saved_game.equip = PlayerInventory.equip
	saved_game.Inprocessarray = PlayerInventory.Inprocessarray
	saved_game.Completedarray = PlayerInventory.Completedarray
	saved_game.levels = PlayerInventory.levels
	saved_game.CharCash = PlayerInventory.CharCash
	saved_game.Name = PlayerInventory.Name
	saved_game.CharExp = PlayerInventory.CharExp
	saved_game.CharLevel = PlayerInventory.CharLevel
	ResourceSaver.save(saved_game,"user://LifeQuestsave.tres")
	
func load_game():
	var saved_game:SaveGame = load("user://LifeQuestsave.tres") as SaveGame
	if saved_game != null:
		#print("load_game is running")
		PlayerInventory.equip = saved_game.equip
		PlayerInventory.inventory = saved_game.inventory
		PlayerInventory.Inprocessarray = saved_game.Inprocessarray
		PlayerInventory.Completedarray = saved_game.Completedarray
		
		if (saved_game.levels != null):
			PlayerInventory.levels = saved_game.levels
		
		if (saved_game.CharCash != null):
			PlayerInventory.CharCash = saved_game.CharCash
		
		if (saved_game.CharExp != null):
			PlayerInventory.CharExp = saved_game.CharExp
			
		if (saved_game.Name != null):
			PlayerInventory.Name = saved_game.Name
			
		if (saved_game.CharLevel != null):
			PlayerInventory.CharLevel = saved_game.CharLevel
		return true
	else:
		return false
