extends Node2D

@onready var menu = $Menu

# Called when the node enters the scene tree for the first time.
func _ready():
	menu.hide() # Ensure in game menu is hidden when level starts

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

