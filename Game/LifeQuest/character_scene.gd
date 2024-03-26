extends Node2D

var headPieces = Array()

# Called when the node enters the scene tree for the first time.
func _ready():
	update_head_dropdown()
	#will be default at index 0
	update_head_stats(0)
	


#preform a get_equip_type call on data base that only returns type HEAD
func update_head_dropdown():
	headPieces = ItemDatabase.get_equip_type(0)
	#add each result to head optionMenue
	for i in headPieces:
		$HeadGearStats/HeadSelect.add_item(i.name)
		
func update_head_stats(index):
	var text = "Health: %d" % headPieces[index].healthBonus
	$HeadGearStats/Health.set_text(text)
	text = "Damage Bonus: %d" % headPieces[index].damage
	$HeadGearStats/Damage.set_text(text)
	text = "Magic Bonus: %d" % headPieces[index].magicBonus
	$HeadGearStats/Magic.set_text(text)
	text = "Defense: %d" % headPieces[index].defenseBonus
	$HeadGearStats/Defense.set_text(text)

#when a user selects an option
func _on_head_select_item_selected(index):
	update_head_stats(index)
	
