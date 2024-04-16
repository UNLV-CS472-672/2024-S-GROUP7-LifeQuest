extends Panel

# Exported variables
@export var title: String = "Quest Title"
@export_multiline var objectives = ""
@export var complete: bool
var ItemScene: PackedScene = preload("res://Scripts/Inventory GUI/Item.tscn")
var item: Node2D = null
@export var quest_reward_amounts:int = 0
@export var ExpAmount:String = "0"
@export var CashAmount:String = "0"
@export var item_name:String = ""
@export var item_quantity:int = 0
@export var item_names:String = ""
@export var item_quantitys:int = 0
@onready var QuestName = $"HBoxContainer/Quest Name"

@onready var RewardSlot1 = $HBoxContainer/HBoxContainer/Slot1
@onready var RewardSlot2 = $HBoxContainer/HBoxContainer/Slot2

func _ready():
	#initialize_quest("Test quest",2,"Iron Sword", 1,"Small Health Potion", 4 )
	pass

#lets initialize everything so we can do function calls like initialize_quest("Explore area", 0) 
func initialize_quest(titles, quest_reward_amount, item1_name = "", item1_quantity = 0, item2_name = "", item2_quantity = 0,objective = "",done=false):
	title = titles
	quest_reward_amounts = quest_reward_amount
	item_name=item1_name
	item_quantity=item1_quantity
	item_names=item2_name
	item_quantitys=item2_quantity
	QuestName.text = title
	complete = done
	item = ItemScene.instantiate()
	complete = false
	objectives = objective
# If quest_reward_amount is 1 and item1_name is provided, add the first item
	if quest_reward_amount >= 1 and item1_name != "":
		var item1 = ItemScene.instantiate()
		RewardSlot1.add_child(item1)
		item1.setitem(item1_name, item1_quantity)

	# If quest_reward_amount is 2 and item2_name is provided, add the second item
	if quest_reward_amount == 2 and item2_name != "":
		var item2 = ItemScene.instantiate()
		RewardSlot2.add_child(item2)
		item2.setitem(item2_name, item2_quantity)

#start of chatGPT 
#https://chat.openai.com/share/bad19120-3687-4244-939b-02a263495252
func find_node_by_name(node: Node, name_to_find: String) -> Node:
	# Check if the current node's name matches the name we're looking for
	if node.name == name_to_find:
		return node

	if node.get_child_count() > 0:
		# Iterate through each child node
		for i in range(node.get_child_count()):
			# Recursively search each child node
			var child = node.get_child(i)
			var found_node = find_node_by_name(child, name_to_find)
			if found_node:
				# Return the node if found
				return found_node

	# If the node is not found in this branch, return null
	return null
#end of chatGPT


func _on_button_pressed():
	#print(get_tree().get_root().name)
	var Quest_interface= find_node_by_name(get_tree().get_root(),"QuestInterface")
	#var Quest_interface = get_node("/root/GameScene/UserInterface/QuestInterface")
	Quest_interface.process_summary_press(self)
