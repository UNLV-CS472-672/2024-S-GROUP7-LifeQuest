extends Node

var items = Array()

func _ready():
		# Example:
	#var item1 = preload("res://Items/Iron Sword.tres") # Adjust the resource paths accordingly
	#var item2 = preload("res://Items/large health potion.tres")
	# Add more items as needed

	# Now you can use these preloaded items as necessary
	#items.append(item1)
	#items.append(item2)
	# Append more items as needed
	#open the resource script in directory
	var directory = DirAccess.open("res://Items/")
	directory.list_dir_begin()

	var filename = directory.get_next()
	#add all the item resources to the item array
	while (filename):
		if not directory.current_is_dir():
			#this is to remove the added .remap when exported to web causing files to not be read correctly
			if filename.ends_with(".remap"):
				filename = filename.substr(0, filename.length() - 6) # Remove the last 6 characters (.remap)
			#print(filename)
			items.append(load("res://Items/%s" % filename))
			filename = directory.get_next()
			 # Remove .remap extension if it exists

	
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
