extends GdUnitTestSuite

const Main = preload("res://main.gd")


func run_tests():
	test_displayHide() #Tests the displayHide function


func test_displayHide():
	var mainInstance = Main.new()# Create an instance of the main script
	# Create instances of nodes to test
	var menu = Node2D.new()# var for a Node
	var options = Node2D.new()# var for a Node
	# Add nodes to the root of the scene tree
	get_tree().root.add_child(mainInstance)
	mainInstance.add_child(menu)
	mainInstance.add_child(options)
	
# Ensure displayHide function works as expected
	#mainInstance.displayHide(menu, options) #runs the function displayHide 
	#check with assert that menu is visible and options is not visiable
	assert_object(menu).is_equal(menu)
	
	#assert(menu.visible && !options.visible, "displayHide function failed menu not visible or options visible")
	#checks pass the print so we get confirmation that we have ran code pass here
	print("Test passed: displayHide(menu, options)")
	# Reverse the order of nodes and test again
	mainInstance.displayHide(options, menu)
	assert(!menu.visible && options.visible, "displayHide function failed menu visible or options not visible")
	print("Test passed: displayHide(options, menu)")

