extends AnimationPlayer


#var elapsed_time = 0.0
#var play_death_timer_started = false
# Called when the node enters the scene tree for the first time.
func _ready():
	# Set the current animation to "Idel" (assuming it's spelled correctly)
	current_animation = "Idle"
	
	# Set the speed scale to 4
	speed_scale = 4.0
	
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
	# Increment the elapsed time
	#elapsed_time += delta
	
	# Check if 5 seconds have elapsed and the death animation hasn't been started yet
	#if elapsed_time >= 5.0 and not play_death_timer_started:
		# Start the death animation
		#playdeath()
		
		# Set flag to indicate the death animation has been started
		#play_death_timer_started = true
		
func playIdle():
	current_animation = "Idle"
	%IdleBack.show()
	%DeathBack.hide()
	%AttackBack.hide()
	%HitBack.hide()
	
func playdeath():
	current_animation = "Death"
	%IdleBack.hide()
	%HitBack.hide()
	%AttackBack.hide()
	%DeathBack.show()

func playattack():
	current_animation = "Attack"
	%IdleBack.hide()
	%HitBack.hide()
	%AttackBack.show()
	
	
func playhit():
	current_animation = "Hit"
	%IdleBack.hide()
	%AttackBack.hide()
	%HitBack.show()
