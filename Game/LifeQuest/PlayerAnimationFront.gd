extends AnimationPlayer


#var elapsed_time = 0.0
#var play_death_timer_started = false
# Called when the node enters the scene tree for the first time.
func _ready():
	# Set the current animation to "Idel" (assuming it's spelled correctly)
	current_animation = "Idle"
	
	# Set the speed scale to 7
	speed_scale = 7.0
	
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
	#test for changes in animation
	# Increment the elapsed time
	#elapsed_time += delta
	
	# Check if 5 seconds have elapsed and the death animation hasn't been started yet
	#if elapsed_time >= 5.0 and not play_death_timer_started:
		# Start the death animation
		#playIdle2()
		
		# Set flag to indicate the death animation has been started
		#play_death_timer_started = true
	#test end
func playIdle():
	current_animation = "Idle"
	%Idle.show()
	%Idle2.hide()
	
func playIdle2():
	current_animation = "Idle2"
	%Idle.hide()
	%Idle2.show()
