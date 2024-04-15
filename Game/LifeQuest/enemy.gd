extends CharacterBody2D

var enemyHealthStat = 20 # Temporary health value. Pull value from where enemy character statistics are stored.
var enemyAttackStat = 2 # Temporary attack value. Pull value from where enemy character statistics are stored.

# TO DO: MAKE PLAYER ATTACK STAT A GLOBAL VARIABLE
var playerAttack = 1 # Temporary value for player attack stat.

var attackCooldown = false
var enemyIsAlive = true

func _physics_process(delta):
	pass
	
# Method that handles player attacks/health calculations
func on_hit():
	if attackCooldown == false:
		print("Enemy is being hit.")
		attackCooldown = true
		$enemyCooldown.start()
		enemyHealthStat = enemyHealthStat - playerAttack - (playerAttack + randi_range(-(playerAttack / 10), (playerAttack / 10)))  # Attack range is playerAttack +/- 10% or +/-1 if too small
		print("Enemy health is: " + str(enemyHealthStat))
		
	if enemyHealthStat <= 0:
		enemyIsAlive = false

func _on_enemy_cooldown_timeout():
	attackCooldown = false # Timer has finished and enemy may take damage again
	
func enemy_health():
	return enemyHealthStat

func is_alive():
	return enemyIsAlive
