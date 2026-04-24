import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },

  type: String,
  fromState: String,
  toState: String,

  actor: String,

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);