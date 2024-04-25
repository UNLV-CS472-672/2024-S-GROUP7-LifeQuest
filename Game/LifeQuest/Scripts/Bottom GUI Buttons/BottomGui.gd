extends HBoxContainer

var user_interface
# Called when the node enters the scene tree for the first time.
func _ready():
	user_interface= find_node_by_name(get_tree().get_root(),"UserInterface")
	setName()
	setLevel()
	setCash()
	setExp()
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	setExp()
	setLevel()
	setCash()
	#level progress test
	#PlayerInventory.CharExp = PlayerInventory.CharExp + 1

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

func setLevel():
	%LevelAmount.text= str(PlayerInventory.CharLevel)

func setName():
	%CharacterName.text = PlayerInventory.Name
	
func setExp():
	#print("Charexp:",PlayerInventory.CharExp)
	#print("Exp*levl:",PlayerInventory.EXPLevelUP * PlayerInventory.CharLevel)
	var exp_ratio = float(PlayerInventory.EXPLevelUP * PlayerInventory.CharLevel) - PlayerInventory.CharExp 
	
	exp_ratio = 100 - exp_ratio
	 # Convert at least one operand to float to ensure floating-point division
	#print("exp_ratio", exp_ratio)
	%ProgressBar.value= exp_ratio

func setCash():
	%Cashamount.text = str(PlayerInventory.CharCash)

func _on_character_pressed():
	pass # Replace with function body.


func _on_inventory_pressed():
	user_interface.process_inventory_press()


func _on_quest_pressed():
	user_interface.process_quest_press()


func _on_shop_pressed():
	pass # Replace with function body.


func _on_setting_pressed():
	pass # Replace with function body.
