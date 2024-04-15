extends Node

var items = Array()

func _ready():
	#open the resource script in directory
	var directory = DirAccess.open("res://Items/")
	directory.list_dir_begin()

	var filename = directory.get_next()
	#add all the item resources to the item array
	while (filename):
		if not directory.current_is_dir():
			items.append(load("res://Items/%s" % filename))
			filename = directory.get_next()
	
#loop through all items and return item if found
func get_item(item_name):
	for i in items:
		if i.name == item_name:
			return i
	return null

#loop through all items and return items of that type
func get_item_type(item_type):
	var foundItems = Array()
	for i in items:
		if i.itemType == item_type:
			foundItems.append(i)
	return foundItems

#returns array of items that belong that that equipment type
func get_equip_type(equip_type):
	var foundItems = Array()
	for i in items:
		if i.equipLocation == equip_type:
			foundItems.append(i)
	return foundItems
