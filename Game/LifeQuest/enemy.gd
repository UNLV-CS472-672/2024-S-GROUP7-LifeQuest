extends CharacterBody2D

var chasePlayer = true
var inEnemyHitbox = false

var enemyHealthStat = 20 # Temporary health value. Pull value from where enemy character statistics are stored.
var enemyAttackStat = 2 # Temporary attack value. Pull value from where enemy character statistics are stored.

# TO DO: MAKE PLAYER ATTACK STAT A GLOBAL VARIABLE
var playerAttack = 1 # Temporary value for player attack stat.

func _physics_process(delta):
	chasePlayer = true
	# call method that chases player
	
#func _on_enemy_hitbox_body_entered(body):
	#if body.has.method("player"):
		#inEnemyHitbox = true # player can hit enemy if within their hitbox
#
#func _on_enemy_hitbox_body_exited(body):
	#if body.has.method("player"):
		#inEnemyHitbox = false # player can no longer hit enemy

# Method that handles player attacks/health calculations
func _on_enemy_hit():
	if inEnemyHitbox == true:
		enemyHealthStat = enemyHealthStat - playerAttack
		
		# TO DO: ADD ATTACK COOLDOWN
		
		if enemyHealthStat <= 0:
			self.queue_free() 
	
