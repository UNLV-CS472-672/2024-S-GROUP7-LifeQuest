extends Control

var menuShown = false

func _ready():
	#$Menu.visible = false
	process_mode = Node.PROCESS_MODE_ALWAYS

# When "Levels" button is pressed:
func _on_levels_pressed():
# TODO: Does the scene need to be stopped before it is changed?
	PlayerInventory.playerHealthStat = 20
	get_tree().paused = false
	get_tree().change_scene_to_file("res://map_scene.tscn") # Fetch level selector scene

# When "Menu" button is pressed:
func _on_menu_pressed():
	# TODO: Does the scene need to be stopped before it is changed?
	PlayerInventory.playerHealthStat = 20
	get_tree().paused = false
	get_tree().change_scene_to_file("res://main.tscn") # Fetch main menu scene	

# When "Quit" button is pressed:
func _on_quit_pressed():
	get_tree().quit() # Quit the game

# When "Settings" button is pressed:
func _on_settings_pressed():
	if menuShown == false:
		get_tree().paused = true
		$Menu.visible = true
		menuShown = true
	else:
		get_tree().paused = false
		$Menu.visible = false
		menuShown = false
