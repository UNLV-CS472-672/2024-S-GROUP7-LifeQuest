const mongoose = require("mongoose");

const userSchema = new Schema({
  // user info
  username: String,
  password: String,
  email: String,
  completedQuiz: Boolean,
  // life stats
  stats: {
    MeStat: Number,
    WorkStat: Number,
    LoveStat: Number,
  },
  // user's quests
  quests: [{ type: Schema.Types.ObjectId, ref: "Quest" }],
  // user's settings
  settings: Object,
});

module.exports = mongoose.model("User", userSchema);
