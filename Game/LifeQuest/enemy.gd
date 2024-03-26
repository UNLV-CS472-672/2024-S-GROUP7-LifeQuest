extends CharacterBody2D

var enemyHealthStat = 20 # Temporary health value. Pull value from where enemy character statistics are stored.
var enemyAttackStat = 2 # Temporary attack value. Pull value from where enemy character statistics are stored.

# TO DO: MAKE PLAYER ATTACK STAT A GLOBAL VARIABLE
var playerAttack = 1 # Temporary value for player attack stat.

var attackCooldown = false

func _physics_process(delta):
	_on_enemy_hit()
	
	if enemyHealthStat <= 0:
		print("Enemy is dead.")
		self.queue_free() 
	
# Method that handles player attacks/health calculations
func _on_enemy_hit():
	if attackCooldown == false:
		print("Enemy is being hit.")
		attackCooldown = true
		$enemyCooldown.start()
		
		enemyHealthStat = enemyHealthStat - playerAttack	

func _on_enemy_cooldown_timeout():
	attackCooldown = false # Timer has finished and enemy may take damage again
