const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // user info
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  completedQuiz: { type: Boolean, default: false },
  // life stats
  stats: {
    MeStat: { type: Number, default: 0 },
    WorkStat: { type: Number, default: 0 },
    LoveStat: { type: Number, default: 0 },
  },
  // user's quests
  quests: [{ type: Schema.Types.ObjectId, ref: "Quest" }],
  // user's settings
  settings: { type: Schema.Types.ObjectId, ref: "Settings" },
});

module.exports = mongoose.model("User", userSchema);
