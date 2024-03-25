extends CharacterBody2D

var playerHealthStat = 20 # Temporary health value. Pull value from where player character statistics are stored.
var playerAttackStat = 2 # Temporary attack value. Pull value from where player character statistics are stored.
var attackCooldown = false
var playerIsAlive = true

# TO DO: MAKE ENEMY ATTACK STAT A GLOBAL VARIABLE
var enemyAttack = 5 # Temporary value for enemy attack stat.

func _physics_process(delta):
	_enemy_is_attacking()
	
	# Checking for if player is still alive
	if playerHealthStat <= 0: # If player health is less than or equal to 0, player is no longer alive
		print("Player is dead.")
		playerIsAlive = false
		self.queue_free()

# Method that handles enemy attacks/health calculations
func _enemy_is_attacking():
	if attackCooldown == false:
		print("Player is being hit.")
		attackCooldown = true  # cooldown timer is active, cannot take another hit until timer is up
		$cooldown.start() # Player cannot be hit for another 3 seconds
		
		playerHealthStat = playerHealthStat - enemyAttack

func _on_cooldown_timeout():
	attackCooldown = false # Resetting cooldown flag back to false once timer is up

func _player_health():
	return playerHealthStat
