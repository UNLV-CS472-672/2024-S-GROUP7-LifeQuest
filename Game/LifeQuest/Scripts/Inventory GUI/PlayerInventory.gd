extends Node

# Preload the scripts for the slot and items
var Save = preload("res://Scripts/Save  Game/Save and load.gd")
const SlotClass = preload("res://Scripts/Inventory GUI/Slot.gd")
const ItemClass = preload("res://Scripts/Inventory GUI/Items.gd")
var Quest: PackedScene = preload("res://Scripts/Quest/Quest.tscn") # load our quest 
#const for inventory slots
const INVENTORYSLOTS = 15
const EQUIPSLOTS = 8

@export var Inprocessarray: Array = []
@export var Completedarray: Array = []
@export var AddQuest: Array

#initial inventory data
var inventory ={
	0: ["Iron Sword", 1],
	#1: ["Wooden Sword", 1],
	1: ["Small Health Potion", 10],
	2: ["Small Health Potion", 5],
	3: ["Large Health Potion", 5],
	#can add more starting items
}

#level completion data (Each time you beat a level, increment the count)

var levels = {
	0: ["Level1" , 0],	# Should be unlocked by default
	1: ["Level2", 0],	# Unlock if Level1 count > 0
	2: ["Level3", 0],	# Unlock if Level2 count > 0

      # ...
      # N: ["Level(n+1)", 0],  # Unlock if Leveln count > 0
}

var equip = {
	#0: [ , ],
	
	
	
}



# Called when the node enters the scene tree for the first time.
func _ready():
	var Saved = Save.new()
	if(Saved.load_game()):
		addquest()
		pass
	else:
		SetQuest()
		print("Set quest")
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func SetQuest():
	var quest_data = [
		{
			"title": "Quest 1",
			"reward_amount": 2,
			"item1_name": "Iron Sword",
			"item1_quantity": 1,
			"item2_name": "Small Health Potion",
			"item2_quantity": 4,
			"description": "Complete Level 1 to obtain rewards"
		},
		{
			"title": "Quest 2",
			"reward_amount": 1,
			"item1_name": "Large Health Potion",
			"item1_quantity": 1,
			"description": "Defeat the boss to obtain the Large Health Potion"
		},
		{
			"title": "Quest 3",
			"reward_amount": 0,
			"description": "Defeat the enemies on Level 3"
		},
		# Add more quests as needed

	]

	for quest_info in quest_data:
		var quest_instance = Quest.instantiate()
		quest_instance.name = quest_info["title"]
		add_child(quest_instance)
		quest_instance.initialize_quest(
			quest_info["title"],
			quest_info["reward_amount"],
			quest_info.get("item1_name", ""),
			quest_info.get("item1_quantity", 0),
			quest_info.get("item2_name", ""),  # default is ""
			quest_info.get("item2_quantity", 0),  #default is 0
			quest_info["description"]
		)
		#print(quest_instance.title)
		#print(quest_instance.QuestName.text)
		PlayerInventory.Inprocessarray.append(quest_instance)
		remove_child(quest_instance)
		
func addquest():
	var quest_data = [

	]
	for quest_info in quest_data:
		var quest_instance = Quest.instantiate()
		quest_instance.name = quest_info["title"]
		add_child(quest_instance)
		quest_instance.initialize_quest(
			quest_info["title"],
			quest_info["reward_amount"],
			quest_info.get("item1_name", ""),
			quest_info.get("item1_quantity", 0),
			quest_info.get("item2_name", ""),  # default is ""
			quest_info.get("item2_quantity", 0),  #default is 0
			quest_info["description"]
		)
		#print(quest_instance.title)
		#print(quest_instance.QuestName.text)
		PlayerInventory.AddQuest.append(quest_instance)
		remove_child(quest_instance)
