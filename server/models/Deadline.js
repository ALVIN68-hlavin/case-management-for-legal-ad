import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },

  type: String,
  dueDate: Date,

  status: {
    type: String,
    default: "PENDING"
  }
});

export default mongoose.model("Deadline", deadlineSchema);