extends Node2D
var Quest: PackedScene = preload("res://Scripts/Quest/Quest.tscn") # load our quest 

@onready var Details = $"QuestDetails" #var for the quest Details panel
@onready var Inprocess = $"ScrollContainer/Quest Scetions/In Process Quest" #var for quest i
@onready var Completed = $"ScrollContainer/Quest Scetions/Completed Quest"
var ItemScene: PackedScene = preload("res://Scripts/Inventory GUI/Item.tscn")

var inventory
var is_tracking_mouse = false #the var used for turning the move on and off
# Called when the node enters the scene tree for the first time.
func _ready():
	pass
	
	
	
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	
	if is_tracking_mouse:
		# Continuously update the global position while the left mouse button is held down

		var move_area_rect = $MoveArea.get_global_rect()
		#print("Move:",move_area_rect)
		#print("Move:",$MoveArea.position)
		global_position = get_global_mouse_position()  -$MoveArea.position #this is so that the mouse is more centered in the Quest menu
		#print("Mouse:",global_position)
	check_quest_completion() #constantly check to see if the quest is complete
	
	

func add_quests():

	for i in range(len(PlayerInventory.Inprocessarray)):
		#print("adding quest")
		var quest_instance = Quest.instantiate()
		quest_instance.name = PlayerInventory.Inprocessarray[i].title
		Inprocess.add_child(quest_instance)
		quest_instance.initialize_quest(
			PlayerInventory.Inprocessarray[i].title,
			PlayerInventory.Inprocessarray[i].quest_reward_amounts,
			PlayerInventory.Inprocessarray[i].item_name,
			PlayerInventory.Inprocessarray[i].item_quantity,
			PlayerInventory.Inprocessarray[i].item_names,  # default is ""
			PlayerInventory.Inprocessarray[i].item_quantitys,  #default is 0
			PlayerInventory.Inprocessarray[i].objectives
		)
		quest_instance.set_CashAmount(PlayerInventory.Inprocessarray[i].CashAmount)
		quest_instance.set_ExpAmount(PlayerInventory.Inprocessarray[i].ExpAmount)
	#for quest that are complete
	for i in range(len(PlayerInventory.Completedarray)):
		var quest_instance = Quest.instantiate()
		quest_instance.name = PlayerInventory.Completedarray[i].title
		Completed.add_child(quest_instance)
		quest_instance.initialize_quest(
			PlayerInventory.Completedarray[i].title,
			PlayerInventory.Completedarray[i].quest_reward_amounts,
			PlayerInventory.Completedarray[i].item_name,
			PlayerInventory.Completedarray[i].item_quantity,
			PlayerInventory.Completedarray[i].item_names,  # default is ""
			PlayerInventory.Completedarray[i].item_quantitys,  #default is 0
			PlayerInventory.Completedarray[i].objectives
		)
		quest_instance.set_CashAmount(PlayerInventory.Completedarray[i].CashAmount)
		quest_instance.set_ExpAmount(PlayerInventory.Completedarray[i].ExpAmount)
	if((len(PlayerInventory.AddQuest)) > 0):
		for i in range(len(PlayerInventory.AddQuest)):
			
			var quest_instance = Quest.instantiate()
			quest_instance.name = PlayerInventory.AddQuest[i].title
			# Check if quest_instance is already in PlayerInventory.Inprocessarray
			var already_added = false
			for existing_quest in PlayerInventory.Inprocessarray:
				#print("existing_quest",existing_quest.title)
				#print("quest_instance",quest_instance.name)
				if existing_quest.title == quest_instance.name:
					already_added = true
					#print(already_added)
					break
			if not already_added:
				Inprocess.add_child(quest_instance)
				PlayerInventory.Inprocessarray.append(quest_instance)
				quest_instance.initialize_quest(
					PlayerInventory.AddQuest[i].title,
					PlayerInventory.AddQuest[i].quest_reward_amounts,
					PlayerInventory.AddQuest[i].item_name,
					PlayerInventory.AddQuest[i].item_quantity,
					PlayerInventory.AddQuest[i].item_names,  # default is ""
					PlayerInventory.AddQuest[i].item_quantitys,  #default is 0
					PlayerInventory.AddQuest[i].objectives
				)
			
# Function to check quest completion status
func check_quest_completion():
	for quest in PlayerInventory.Inprocessarray:
		if quest.complete:
			questreward(quest)
			move_to_completed(quest)

func questreward(quest):
	PlayerInventory.CharCash = int(quest.CashAmount) + int(PlayerInventory.CharCash)
	PlayerInventory.CharExp = int(PlayerInventory.CharExp) + int(quest.ExpAmount)
	
		# Check if RewardSlot1 is not null
	if quest.item_name != "":
		# Iterate over the inventory to find an empty slot
		for i in range(len(PlayerInventory.inventory)):
			if PlayerInventory.inventory[i] == null:
				var item1 = ItemScene.instantiate()
				print("item Name", quest.item_name)
				print("item amount", quest.item_quantity)
				item1.setitem(quest.item_name, quest.item_quantity)
				PlayerInventory.stop = true
				PlayerInventory.inventory[i] = item1
				#PlayerInventory.stop = false
				break  # Exit the loop once reward is added
	
	# Check if RewardSlot2 is not null
	if quest.item_names != "":
		# Iterate over the inventory to find an empty slot
		for i in range(len(PlayerInventory.inventory)):
			if PlayerInventory.inventory[i] == null:
				var item2 = ItemScene.instantiate()
				print("item Name", quest.item_names)
				print("item amount", quest.item_quantitys)
				item2.setitem(quest.item_names, quest.item_quantitys)
				PlayerInventory.stop = true
				PlayerInventory.inventory[i] = item2
				inventory = find_node_by_name(get_tree().get_root(),"Inventory")
				inventory.loadinventory()
				PlayerInventory.stop = false
				break  # Exit the loop once reward is added
	
	
	


# Function to move a quest to the Completed Quest section
func move_to_completed(quest):
	PlayerInventory.Inprocessarray.erase(quest)
	var node = remove_node_by_name(Inprocess, quest.title)
	#Inprocess.remove_child(quest)  # Remove from the scene tree
	PlayerInventory.Completedarray.append(quest)
	
	print(quest.title)
	Completed.add_child(node)
	print(quest)

func process_summary_press(quest):
	if(!$QuestDetails.visible):
		$QuestDetails.visible = visible
	Details.setTitle(quest.title)
	Details.setComplete(quest.objectives)
	Details.setRewards(quest.ExpAmount,quest.CashAmount)
	
	#print(duplicatedNode.RewardSlot1)

	#print(Details)
func remove_node_by_name(parent_node, node_name):
	# Iterate through all children of the parent node
	for child in parent_node.get_children():
		# Check if the child node's name matches the target node name
		if child.name == node_name:
			# Remove the child node from the parent node
			parent_node.remove_child(child)
			# Deallocate the memory of the child node
			#child.queue_free()
			return child # Exit the function after removing the node (assuming each name is unique)
	# If the node with the given name is not found, you can handle it here
	print("Node with name", node_name, "not found.")

#quit button functionality making the node from visible to not visible
func _on_button_pressed():
	visible = !visible

# This function is for moving the Quest Menu around
func _input(event):
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT:
		if event.pressed:
			var mouse_pos = get_global_mouse_position() # var for mouse position
			var move_area_rect = $MoveArea.get_global_rect() #this is the area the mouse needs to be in
			if move_area_rect.has_point(mouse_pos): #this checks if the mouse is in the area of the var
				is_tracking_mouse = true #then we want tracking mouse on
		else:
			is_tracking_mouse = false #otherwise tracking off


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
