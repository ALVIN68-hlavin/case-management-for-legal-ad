import express from "express";
import {
  createCase,
  getCases,
  updateCaseState
} from "../controllers/caseController.js";

const router = express.Router();

router.post("/", createCase);
router.get("/", getCases);
router.patch("/:caseId/state", updateCaseState);

router.get("/:caseId", async (req, res) => {
  const c = await Case.findById(req.params.caseId);
  res.json(c);
});

router.get("/:caseId/events", async (req, res) => {
  const events = await Event.find({ caseId: req.params.caseId });
  res.json(events);
});

router.get("/:caseId/deadlines", async (req, res) => {
  const deadlines = await Deadline.find({ caseId: req.params.caseId });
  res.json(deadlines);
});

router.post("/:caseId/documents", upload.single("file"), async (req, res) => {
  const { caseId } = req.params;

  const doc = {
    filename: req.file.filename,
    type: req.body.type // e.g. "DEFENCE"
  };

  // AUTO TRIGGER STATE CHANGE
  if (doc.type === "DEFENCE") {
    await transitionCase(caseId, "DEFENCE_FILED", req.user.id);
  }

  res.json({ success: true });
});

router.patch(
  "/:caseId/state",
  requirePermission("STATE_TRANSITION"),
  updateCaseState
);

export default router;