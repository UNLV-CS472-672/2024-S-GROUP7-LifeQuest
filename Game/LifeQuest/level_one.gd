extends Node2D

@onready var player = $Character # Variable to access "player" child node
@onready var playerHealth = PlayerInventory.playerHealthStat
@onready var enemy = $Slime# Variable to access "enemy" child node
@onready var enemyHealth = $Slime.enemyHealthStat
@onready var postBattle = $PostBattle



@onready var menu = $Menu
var reference_size = Vector2(1.0 / 1151, 1.0 / 648)
var isBattleOver = false


# Called when the node enters the scene tree for the first time.
func _ready():
	$UserInterface/Menu.hide() # Ensure in game menu is hidden when level starts
	player.show()
	enemy.show()
	$UserInterface.show()
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	var new_size = get_viewport_rect().size
	var scale_factor_x = new_size.x * reference_size.x
	var scale_factor_y = new_size.y * reference_size.y
	# Choose the smaller scale factor to maintain aspect ratio
	var scale_factor = min(scale_factor_x, scale_factor_y)
	$UserInterface.scale = Vector2(scale_factor, scale_factor)
	scale = Vector2(scale_factor, scale_factor)
	
	
	if player.is_alive() and enemy.is_alive() == false: # If player is alive and enemy is dead.
		PlayerInventory.playerHealthStat = 20 #lets reset health, normally this will be handle by potions
		PlayerInventory.levels[1][1] = 1 #level 1 complete unlock level2 
		$UserInterface.savegame() #we need to save game since we progressed in our level
		print("Enemy is dead.")
		enemy.playdeath() 
		await get_tree().create_timer(1.2).timeout
		enemy.hide()
		$UserInterface.hide()
		postBattle.on_Victory() 

		get_tree().paused = true
		
	if player.is_alive() == false and enemy.is_alive(): # If player is dead and enemy is alive.
		$UserInterface.savegame()
		print("Player is dead.")
		player.hide()
		$UserInterface.hide()
		postBattle.on_Defeat()
		player.playerIsAlive = true
		PlayerInventory.playerHealthStat = 20
		get_tree().paused = true
	
	if player.is_alive() and enemy.is_alive() : # Checking if both entities are still alive. If still alive, continue attacking.
		player.on_hit()
		enemy.on_hit()
		


