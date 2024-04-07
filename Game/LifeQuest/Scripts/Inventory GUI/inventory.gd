extends Node2D
#need the Slot refrence as it goes hand in hand with inventory
const SlotClass = preload("res://Scripts/Inventory GUI/Slot.gd")

# refrence to the Grid where the slots are at
@onready var inventoryslot = $GridContainer
@onready var equipslots = $EquipSlot
#var for the item that the mouse has
var holditem = null
var initialized_inventory = false
# Called when the node enters the scene tree for the first time.
func _ready():
	for i in range(inventoryslot.get_child_count()):
		var invslot = inventoryslot.get_child(i)
		invslot.gui_input.connect(slotinput.bind(invslot))
		invslot.slotType = SlotClass.SlotType.INVENTROY
	
	for i in range(equipslots.get_child_count()):
		var equslot = equipslots.get_child(i)
		equslot.gui_input.connect(slotinput.bind(equslot))
		match i:
			0:
				equslot.slotType = SlotClass.SlotType.HEAD
			1:
				equslot.slotType = SlotClass.SlotType.PANTS
			2:
				equslot.slotType = SlotClass.SlotType.HANDS
			3:
				equslot.slotType = SlotClass.SlotType.SHOES
			4:
				equslot.slotType = SlotClass.SlotType.WEAPON
			5:
				equslot.slotType = SlotClass.SlotType.ACCESSORY
			6:
				pass #empty slot null
			7:
				equslot.slotType = SlotClass.SlotType.ACCESSORY
		#check to see if they are assigned
		#print(equslot.slotType)
		
	for equipslot in equipslots.get_children():
		equipslot.gui_input.connect(slotinput.bind(equipslot))
		#equipslot[i] = SlotClass.SlotType.INVENTROY
		
#function afor loading inventory after save file
func loadinventory():
	var slot = inventoryslot.get_children()
	var slot2 = equipslots.get_children()
	for i in range(slot.size()):
		if(PlayerInventory.inventory[i]):
			#print("i:",i)
			#print(PlayerInventory.inventory[i].itemname)
			#print(PlayerInventory.inventory[i].itemquantity)
			slot[i].initializeitem(PlayerInventory.inventory[i].itemname,PlayerInventory.inventory[i].itemquantity)
			
			
	for x in range(slot2.size()):
		if(PlayerInventory.equip[x]):
			#print("i:",i)
			#print(PlayerInventory.inventory[i].itemname)
			#print(PlayerInventory.inventory[i].itemquantity)
			slot2[x].initializeitem(PlayerInventory.equip[x].itemname,PlayerInventory.equip[x].itemquantity)
			
	initialized_inventory = true
#function for initalizing the inventory
func initializeinventory(check):
	#print("initalized invent:",initialized_inventory)
	if check:
		return

	#print("did not skip")
	var slot = inventoryslot.get_children()
	for i in range(slot.size()):
		#print(PlayerInventory.inventory)
		if PlayerInventory.inventory.has(i):
			
			slot[i].initializeitem(PlayerInventory.inventory[i][0],PlayerInventory.inventory[i][1])
		
	initialized_inventory = true

	for i in range(slot.size()):
		PlayerInventory.inventory[i]= slot[i].item
	var slot2 = equipslots.get_children()
	for i in range(slot2.size()):
		PlayerInventory.equip[i]= slot2[i].item
		
#function for initalizing the equips
func initializeequip():
	pass

#function that updates the players inventory and what the data in slots are
func _process(delta):
	if (initialized_inventory):
		var slot = inventoryslot.get_children()
		for i in range(slot.size()):
			PlayerInventory.inventory[i]= slot[i].item
		var slot2 = equipslots.get_children()
		for i in range(slot2.size()):
			PlayerInventory.equip[i]= slot2[i].item



func slotinput(event:InputEvent, slot:SlotClass):
	if(slot.item):
		var item = ItemDatabase.get_item(slot.item.name)
		_on_item_hovered(slot.item.itemname,get_global_mouse_position())
		#print(item.equipLocation)
		
	else:
		_on_item_exited()
	#var item = ItemDatabase.get_item(slot.item.itemname)
	#print(item)
	
	# check for mouse button input
	if event is InputEventMouseButton:
		
		if event.button_index == MOUSE_BUTTON_LEFT && event.pressed:
			if holditem != null:
				if !slot.item: #place item to slot
					
					var item = ItemDatabase.get_item(holditem.itemname)
					if item.equipLocation  == slot.slotType: 
						#print(item.equipLocation)
						slot.putslot(holditem)
						holditem = null
					else:
						if(item.itemType != 0 && slot.slotType == 0 ):
							slot.putslot(holditem)
							holditem = null
						else:
							print ("does not go into slot:",slot.slotType," as it is of type:",item.equipLocation)
				else: #we want to swap items with slot and held
					if holditem.itemname != slot.item.itemname:
						var item = ItemDatabase.get_item(holditem.itemname)
						if item.equipLocation  == slot.slotType: 
							#print("swap")
							var temp = slot.item
							slot.pickslot()
							temp.global_position = event.global_position
							slot.putslot(holditem)
							holditem = temp
					else:#the combine item part
						
						var item = ItemDatabase.get_item(slot.item.itemname)
						#print(item)
						var stacksize = item.max_stack_size
					
						var add = stacksize - slot.item.itemquantity #calculate the max amount -amount we have
						
						if add >= holditem.itemquantity: #if it the amount is bigger then the quantity dont combine but keep 
							slot.item.addquantity(holditem.itemquantity)
							holditem.queue_free()
							holditem = null
						else:#otherwise we can combine both items
							#print(add)
							slot.item.addquantity(add)
							holditem.decreasequantity(add)
							
			elif slot.item:
				holditem = slot.item
				slot.pickslot()
				holditem.global_position = get_global_mouse_position()
				
func _input(event):
	if holditem:
		holditem.global_position = get_global_mouse_position()
		

#x button to close inventory
func _on_quit_button_pressed():
	visible = !visible


# Function to show tooltip when hovering over an item
func _on_item_hovered(item_name: String, position):
	# Show tooltip with information about the item
	$TooltipLabel.global_position = position+ Vector2 (20,10)
	$TooltipLabel.text = "Item: " + item_name
	$TooltipLabel.visible = true

# Function to hide tooltip when not hovering over an item
func _on_item_exited():
	$TooltipLabel.visible = false
