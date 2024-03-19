extends CharacterBody2D

var inPlayerHitbox = false

var playerHealthStat = 20 # Temporary health value. Pull value from where player character statistics are stored.
var playerAttackStat = 2 # Temporary attack value. Pull value from where player character statistics are stored.

# TO DO: MAKE ENEMY ATTACK STAT A GLOBAL VARIABLE
var enemyAttack = 1 # Temporary value for enemy attack stat.

func _physics_process(delta):
	pass 
	# player automatically moves toward enemy?

func _on_player_hitbox_body_entered(body):
	if body.has.method("enemy"):
		inPlayerHitbox = true # enemy can hit player if within their hitbox

func _on_player_hitbox_body_exited(body):
	if body.has.method("enemy"):
		inPlayerHitbox = false # enemy can no longer hit player

# Method that handles enemy attacks/health calculations
func _on_player_hit():
	if inPlayerHitbox == true:
		playerAttackStat = playerAttackStat - enemyAttack
		
		# TO DO: ADD ATTACK COOLDOWN TIMER
		
		if playerHealthStat <= 0:
			self.queue_free()
