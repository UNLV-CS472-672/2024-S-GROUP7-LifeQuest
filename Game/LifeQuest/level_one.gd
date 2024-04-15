extends Node2D

@onready var menu = $Menu

# Called when the node enters the scene tree for the first time.
func _ready():
	menu.hide() # Ensure in game menu is hidden when level starts

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func _on_settings_pressed():
	if menu.visible == false: # If menu is hidden:
		menu.visible = true # Show menu
		Engine.time_scale = 1 # Pause game
	else: # If menu is showing:
		menu.visible = false # Hide menu
		Engine.time_scale = 0  # Resume game
