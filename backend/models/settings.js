const mongoose = require("mongoose");
const { Schema } = mongoose;

const settingsSchema = new Schema({
  // relates to user
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // relates to adjustments of user interface
  uiPreferences: {
    fontSize: { type: Number, default: 14 },
    theme: { type: String, default: "light" },
  },
});

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
