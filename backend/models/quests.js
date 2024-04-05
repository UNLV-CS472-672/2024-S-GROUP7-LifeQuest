const mongoose = require("mongoose");
const { Schema } = mongoose;

const questSchema = new Schema({
  // quest info
  title: String,
  description: String,
  // changes that will be made to the user's stats
  statImprovements: {
    MeStat: Number,
    WorkStat: Number,
    LoveStat: Number,
  },
  // requirements to complete the quest
  requirements: String,
});

const Quest = mongoose.model("Quest", questSchema);

module.exports = Quest;
