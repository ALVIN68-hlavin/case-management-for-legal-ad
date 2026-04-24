import Case from "../models/Case.js";
import { transitionCase } from "../services/workflowService.js";

// Create case
export const createCase = async (req, res) => {
  const newCase = await Case.create(req.body);
  res.json(newCase);
};

// Get all cases
export const getCases = async (req, res) => {
  const cases = await Case.find();
  res.json(cases);
};

// Transition state
export const updateCaseState = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { nextState } = req.body;

    const updated = await transitionCase(
      caseId,
      nextState,
      req.user?.id || "system"
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};