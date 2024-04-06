extends Node2D
#need the Slot refrence as it goes hand in hand with inventory
const SlotClass = preload("res://Slot.gd")
# refrence to the Grid where the slots are at
@onready var inventoryslot = $GridContainer
#var for the item that the mouse has
var holditem = null

# Called when the node enters the scene tree for the first time.
func _ready():
	for invslot in inventoryslot.get_children():
		invslot.gui_input.connect(slotinput.bind(invslot))

func slotinput(event:InputEvent, slot:SlotClass):
	# check for mouse button input
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT && event.pressed:
			if holditem != null:
				if !slot.item: #place item to slot
					slot.putslot(holditem)
					holditem = null
				else: #we want to swap items with slot and held
					var temp = slot.item
					slot.pickslot()
					temp.global_position = event.global_position
					slot.putslot(holditem)
					holditem = temp
			elif slot.item:
				holditem = slot.item
				slot.pickslot()
				holditem.global_position = get_global_mouse_position()
				
func _input(event):
	if holditem:
		holditem.global_position = get_global_mouse_position()
		

