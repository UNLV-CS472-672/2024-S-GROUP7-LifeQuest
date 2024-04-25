extends Node2D
var enemyHealthStat = 20 # Temporary health value. Pull value from where enemy character statistics are stored.
var enemyAttackStat = 2 # Temporary attack value. Pull value from where enemy character statistics are stored.

@onready var animate = $AnimationPlayer

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
		enemyHealthStat = enemyHealthStat - (PlayerInventory.playerAttackStat + randi_range(-(PlayerInventory.playerAttackStat / 10), (PlayerInventory.playerAttackStat / 10)))  # Attack range is playerAttack +/- 10% or +/-1 if too small
		print("Enemy health is: " + str(enemyHealthStat))
		
	if enemyHealthStat <= 0:
		enemyIsAlive = false

func _on_enemy_cooldown_timeout():
	attackCooldown = false # Timer has finished and enemy may take damage again
	
func enemy_health():
	return enemyHealthStat

func is_alive():
	return enemyIsAlive

func playdeath():
	animate.playdeath()
