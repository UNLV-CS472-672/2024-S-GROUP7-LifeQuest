extends Node

# Preload the scripts for the slot and items
var Save = preload("res://Scripts/Save  Game/Save and load.gd")
const SlotClass = preload("res://Scripts/Inventory GUI/Slot.gd")
const ItemClass = preload("res://Scripts/Inventory GUI/Items.gd")
var Quest: PackedScene = preload("res://Scripts/Quest/Quest.tscn") # load our quest 
#const for inventory slots
const INVENTORYSLOTS = 15
const EQUIPSLOTS = 8
const EXPLevelUP = 100
var stop = false

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
@export var Name: String = "Test"
@export var CharExp: int = 0
@export var CharLevel: int = 1
@export var CharCash: int = 101

# Function to calculate exp required for next level
func exp_required_for_next_level(level):
	return EXPLevelUP * level #100 * level for required
	

#level completion data (Each time you beat a level, increment the count)
var levels = {
	0: ["Level 1" , 0],	# Should be unlocked by default
	1: ["Level 2", 0],	# Unlock if Level1 count > 0
	2: ["Level 3", 0],	# Unlock if Level2 count > 0

	  # ...
	  # N: ["Level(n+1)", 0],  # Unlock if Leveln count > 0
}

#player equipment array
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
		#print("Set quest")
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
		# Check if the player has enough exp to level up
	while CharExp >= exp_required_for_next_level(CharLevel):
		level_up()

# Function to handle level up
func level_up():
	CharLevel += 1
	
	
#quest initalization here
func SetQuest():
	var quest_data = [
		{
			"title": "Quest 1",
			"reward_amount": 2,
			"item1_name": "hat with ears",
			"item1_quantity": 1,
			"item2_name": "Small Health Potion",
			"item2_quantity": 4,
			"description": "Complete Level 1 to obtain rewards",
			"ExpAmount" : "80",
			"CashAmount": "100"
		},
		{
			"title": "Quest 2",
			"reward_amount": 1,
			"item1_name": "Large Health Potion",
			"item1_quantity": 1,
			"description": "Defeat the boss to obtain the Large Health Potion",
			"ExpAmount" : "120",
			"CashAmount": "200"
		},
		{
			"title": "Quest 3",
			"reward_amount": 0,
			"description": "Defeat the enemies on Level 3",
			"ExpAmount" : "50",
			"CashAmount": "150"
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
		quest_instance.set_ExpAmount(quest_info.get("ExpAmount", "0"))
		quest_instance.set_CashAmount(quest_info.get("CashAmount", "0"))
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
