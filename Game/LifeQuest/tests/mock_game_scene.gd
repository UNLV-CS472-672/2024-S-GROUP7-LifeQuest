extends Node2D

@onready var player = $player # Variable to access "player" child node
@onready var playerHealth = $player.player_health 
@onready var enemy = $enemy # Variable to access "enemy" child node
@onready var enemyHealth = $enemy.enemy_health


# Called when the node enters the scene tree for the first time.
func _ready():
	get_node("UI/Lose").hide()
	get_node("UI/Win").hide()

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	
	if player.is_alive() and enemy.is_alive() : # Checking if both entities are still alive. If still alive, continue attacking.
		player.on_hit()
		enemy.on_hit()
	
	if player.is_alive() and enemy.is_alive() == false: # If player is alive and enemy is dead.
		print("Enemy is dead.")
		enemy.queue_free()
		get_node("UI/Win").show()
		get_tree().paused = true
		
	if player.is_alive() == false and enemy.is_alive(): # If player is dead and enemy is alive.
		print("Player is dead.")
		player.queue_free()
		get_node("UI/Lose").show()
		get_tree().paused = true
	
