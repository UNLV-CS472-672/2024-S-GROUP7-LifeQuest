extends Node

# Preload the main script for testing
const Main = preload("res://main.gd")


func _ready():
	# Run the tests
	run_tests()

func run_tests():
	test_displayHide() #Tests the displayHide function
	button_press_test() #Test for the buttons
func test_displayHide():
	var maininstance = Main.new()# Create an instance of the main script
	maininstance.name = "test_displayHide"
	# Create instances of nodes to test
	var menu = Node2D.new()# var for a Node
	var options = Node2D.new()# var for a Node
	options.name = "options"
	menu.name = "menu"
	add_child(maininstance)
	maininstance.add_child(menu)
	maininstance.add_child(options)
	# Ensure displayHide function works as expected
	maininstance.displayHide(menu, options) #runs the function displayHide 
	#check with assert that menu is visible and options is not visiable
	assert(menu.visible && !options.visible, "displayHide function failed menu not visible or options visible")
	#checks pass the print so we get confirmation that we have ran code pass here
	print("Test passed: displayHide(menu, options)")
	
	
	# Reverse the order of nodes and test again
	maininstance.displayHide(options, menu)
	assert(!menu.visible && options.visible, "displayHide function failed menu visible or options not visible")
	print("Test passed: displayHide(options, menu)")

func button_press_test():
	# Create an instance of the main script
	var maininstance = Main.new()
	maininstance.name = "button_press_test"
	add_child(maininstance)
	# Set up nodes for testing
	var options = Node2D.new()# var for a Node
	var menu = Node2D.new()# var for a Node
	var audio = Node2D.new()
	var video = Node2D.new()
	options.name = "options"
	menu.name = "menu"
	audio.name = "audio"
	video.name = "video"
	maininstance.add_child(menu)
	maininstance.add_child(options)
	maininstance.add_child(audio)
	maininstance.add_child(video)
	
	# Set the nodes in the main script instance
	maininstance.Options = options
	maininstance.Menu = menu
	maininstance.Audio = audio
	maininstance.Video = video
	
	
	#function calls
	# Call the _on_options_pressed function
	maininstance._on_options_pressed()	
	# Check if the displayHide function was called with the correct arguments
	assert(options.visible == true, "_on_options_pressed function failed to show Options node")
	assert(menu.visible == false, "_on_options_pressed function failed to hide Menu node")
	print("Test passed: _on_options_pressed()")
	
	# Call the _on_back_options_pressed function
	maininstance._on_back_options_pressed()
	 # Check if the displayHide function was called with the correct arguments
	assert(options.visible == false, "_on_back_options_pressed function failed to hide Options node")
	assert(menu.visible == true, "_on_back_options_pressed function failed to show Menu node")
	print("Test passed: _on_back_options_pressed()")
	
	# Call the _on_back_video_pressed function
	maininstance._on_back_video_pressed()
	 # Check if the displayHide function was called with the correct arguments
	assert(options.visible == true, "_on_back_video_pressed function failed to show Options node")
	assert(video.visible == false, "_on_back_video_pressed function failed to hide Video node")
	print("Test passed: _on_back_video_pressed()")
	
	# Call the _on_back_audio_pressed function
	maininstance._on_back_audio_pressed()
	# Check if the displayHide function was called with the correct arguments
	assert(options.visible == true, "_on_back_audio_pressed function failed to show Options node")
	assert(audio.visible == false, "_on_back_audio_pressed function failed to hide Audio node")
	print("Test passed: _on_back_audio_pressed()")
	
	# Call the _on_video_presse function
	maininstance._on_video_pressed()
	# Check if the displayHide function was called with the correct arguments
	assert(video.visible == true, "_on_video_pressed function failed to show Video node")
	assert(options.visible == false, "_on_video_pressed function failed to hide Options node")
	print("Test passed: _on_video_pressed()")
	
	# Call the _on_audio_pressed function
	maininstance._on_audio_pressed()
	# Check if the displayHide function was called with the correct arguments
	assert(audio.visible == true, "_on_video_pressed function failed to show Video node")
	assert(options.visible == false, "_on_video_pressed function failed to hide Options node")
	print("Test passed: _on_audio_pressed()")
	
	# Add more assertions here for Menu: 

