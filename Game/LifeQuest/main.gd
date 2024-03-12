extends Node2D
#var refrences to the nodes
@onready var Menu = $MainMenu/Menu
@onready var Options =$MainMenu/Options
@onready var Audio =$MainMenu/Audio
@onready var Video =$MainMenu/Video


func _on_play_pressed():
	get_tree().change_scene_to_file("res://game_scene.tscn")


func _on_quit_pressed():
	get_tree().quit()


func _on_options_pressed():
	displayHide(Options,Menu)

	#menu hide and display function
func displayHide(first,sec):
	first.show() #show the first var passed in
	sec.hide()   #hide the second var passed in

#function for what happens when the options back button
func _on_back_options_pressed():
	displayHide(Menu,Options)
	


#function for what happens when the video back button
func _on_back_video_pressed():
	displayHide(Options,Video)
	

#function for what happens when the audio back button
func _on_back_audio_pressed():
	displayHide(Options,Audio)

#function for what happens when the button for video is pressed
func _on_video_pressed():
	displayHide(Video,Options)
	

#function for what happens when the button for audio is pressed
func _on_audio_pressed():
	displayHide(Audio,Options)




#TODO: 
#Addition of volume functions when sounds are added later, unable to test
#these work off of the slider
func _on_master_value_changed(value):
	pass # Replace with function body.


func _on_music_value_changed(value):
	pass # Replace with function body.


func _on_sound_fx_value_changed(value):
	pass # Replace with function body.
