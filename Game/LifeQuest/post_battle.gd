extends Control

# Called when the node enters the scene tree for the first time.
func _ready():
	process_mode = Node.PROCESS_MODE_ALWAYS
	get_node("VictoryMsg").hide()
	get_node("DefeatMsg").hide()
	get_node("ReturnToLevels").hide()

# Function to call when player wins battle
func on_Victory():
	get_node("VictoryMsg").show() # Display victory message
	get_node("ReturnToLevels").show() # Displays option to return to level selection

# Function to call when player loses battle
func on_Defeat():
	get_node("DefeatMsg").show() # Displays defeat message
	get_node("ReturnToLevels").show() # Displays option to return to level selection

# When "Return to Levels" button is pressed:
func _on_return_to_levels_pressed():
	get_tree().paused = false
	get_tree().change_scene_to_file("res://map_scene.tscn") # Fetch map scene (level selection)
	
