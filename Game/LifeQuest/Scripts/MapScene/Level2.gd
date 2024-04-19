extends Button

var level = 2;
# Called when the node enters the scene tree for the first time.
func _ready():
	#minus one for dictionary referencing
	var dicLevel = level - 1
	# get the level completing dictionary entry
	var levelStatus = PlayerInventory.levels
	# check if unlocked
	if (levelStatus[dicLevel][1] <= 0):
		# if not unlocked disable button interactions
		# and change text to signify its locked and why
		disabled = true
		text = "Level " + str(level) + "\nLocked"
		tooltip_text = "Complete " + levelStatus[dicLevel - 1][0] + " to unlock"


func _on_toggled(toggled_on):
	if $PopMenu.visible == false:
		$PopMenu.visible = true
	else:
		$PopMenu.visible = false
		
func _on_yes_pressed():
	get_tree().change_scene_to_file("res://level_two.tscn")
	
func _on_no_pressed():
	button_pressed = false
