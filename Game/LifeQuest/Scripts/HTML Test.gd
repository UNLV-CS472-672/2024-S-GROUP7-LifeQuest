#NOTE An HTML request Test

extends Node

# Initialize HTTPRequest object
var http_request = HTTPRequest.new()

func _ready():
	
	# Connect signals
	$HTTPRequest.request_completed.connect(_on_request_completed)
	# Set up the request
	$HTTPRequest.request("https://api.github.com/repos/UNLV-CS472-672/2024-S-GROUP7-LifeQuest")
	#cookie header with JWT token
	var jwt_token = "your_jwt_token_here"
	#http_request.set_header("Cookie", "login=" + jwt_token)
	# Send the request
	#http_request.start()
	

func _on_request_completed(result, response_code, headers, body):
	print("_on_request_completed")
	# Check if the request was successful (200 OK)
	if response_code == 200:
		# Parse and process the response body
		var json = JSON.parse_string(body.get_string_from_utf8())
		print(json["name"])
	else:
		# Handle error response
		print("Error: HTTP request failed with response code:", response_code)
