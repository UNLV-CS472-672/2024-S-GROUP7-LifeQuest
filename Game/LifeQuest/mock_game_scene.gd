extends Node2D

# var battleInProgress = false
# load player health
# load player attack
# load enemy health for level 1?

# Called when the node enters the scene tree for the first time.
func _ready():
	# set battleInProgress to TRUE
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	# set enemy attack to some random value between 1-3
	# call _player_in_battle
	# call _enemy_in_battle
	pass

#TODO: 
func _player_in_battle(): # Method that handles dealing damage to the enemy
	# if battleInProgress is TRUE
		# if attack cooldown timer not active
			# player health = player health - enemy attack
			# call cooldown timer for attack
	pass

#TODO:
func _enemy_in_battle():	# Method that handles attacking the enemy
	# if battleInProgress is TRUE
		# if attack cooldown timer not active
			# enemy health = enemy health - player attack
			# call cooldown timer for attack
	pass
