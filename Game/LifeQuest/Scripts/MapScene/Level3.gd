extends Button

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func _on_toggled(toggled_on):
	if $PopMenu.visible == false:
		$PopMenu.visible = true
	else:
		$PopMenu.visible = false	

func _on_yes_pressed():
	get_tree().change_scene_to_file("res://level_three.tscn")

func _on_no_pressed():
	button_pressed = false
