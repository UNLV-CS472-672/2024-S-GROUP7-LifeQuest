extends Node2D

var reference_size = Vector2(1.0 / 1151, 1.0 / 648)
# Called when the node enters the scene tree for the first time.
func _ready():
	pass

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	var new_size = get_viewport_rect().size
	var scale_factor_x = new_size.x * reference_size.x
	var scale_factor_y = new_size.y * reference_size.y
	# Choose the smaller scale factor to maintain aspect ratio
	var scale_factor = min(scale_factor_x, scale_factor_y)
	
	scale = Vector2(scale_factor, scale_factor)

func _on_screen_resized():
	# This method will be called whenever the window is resized
	
	#var new_size = get_viewport_rect().size
	pass
