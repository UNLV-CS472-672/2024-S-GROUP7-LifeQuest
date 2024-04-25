extends Node2D


@onready var animate = $AnimationPlayer
var attackCooldown = false
var playerIsAlive = true

# TO DO: MAKE ENEMY ATTACK STAT A GLOBAL VARIABLE
var enemyAttack = 5 # Temporary value for enemy attack stat.

func _physics_process(delta):
	if PlayerInventory.playerHealthStat <= 0: # If player health is less than or equal to 0, player is no longer alive
		playerIsAlive = false

# Method that handles enemy attacks/health calculations
func on_hit():
	if attackCooldown == false:
		animate.playhit()
		print("Player is being hit.")
		attackCooldown = true  # cooldown timer is active, cannot take another hit until timer is up
		$cooldown.start() # Player cannot be hit for another 3 seconds
		PlayerInventory.playerHealthStat = PlayerInventory.playerHealthStat - (enemyAttack + randi_range(-(enemyAttack / 10), (enemyAttack / 10)))  # Attack range is enemyAttack +/- 10% or +/-1 if too small
		print("Player health is: " + str(PlayerInventory.playerHealthStat))
		

func _on_cooldown_timeout():
	attackCooldown = false # Resetting cooldown flag back to false once timer is up
	
func player_health():
	return PlayerInventory.playerHealthStat
	
func is_alive():
	return playerIsAlive

func playidle():
	animate.playIdle()
	
func playattack():
	animate.playattack()

func playdeath():
	animate.playdeath()
