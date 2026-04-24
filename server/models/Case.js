import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  title: String,
  caseNumber: String,

  status: {
    type: String,
    default: "FILED"
  },

  parties: [
    {
      name: String,
      role: String
    }
  ]

}, { timestamps: true });

export default mongoose.model("Case", caseSchema);