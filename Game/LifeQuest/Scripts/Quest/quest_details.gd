extends Panel
@onready var QuestTitle = $InfoContainer/QuestTitle
@onready var Objective =  $InfoContainer/CompleteCondition
@onready var exp = $"RewardContainer/Exp/Exp Amount"
@onready var cash = $"RewardContainer/Cash/Cash Amount"
@onready var rewards = $RewardContainer
func _ready():
	pass

func setTitle(title):
	QuestTitle.text = title

func setComplete(data):
	Objective.text = data
	
func setRewards(ExpAmount,CashAmount):
	exp.text = ExpAmount
	cash.text = CashAmount
	
	
	
func AddRewardIcon(Nodes):
	rewards.add_child(Nodes)


func _on_button_pressed():
	visible = !visible
