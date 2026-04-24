import Case from "../models/Case.js";
import Event from "../models/Event.js";
import Deadline from "../models/Deadline.js";
import { TRANSITIONS } from "../config/caseWorkflow.js";

function canTransition(current, next) {
  return TRANSITIONS[current]?.includes(next);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export async function transitionCase(caseId, nextState, actor) {
  const caseItem = await Case.findById(caseId);

  if (!caseItem) throw new Error("Case not found");

  const current = caseItem.status;

  if (!canTransition(current, nextState)) {
    throw new Error(`Invalid transition: ${current} → ${nextState}`);
  }

  // Update state
  caseItem.status = nextState;
  await caseItem.save();

  // Log event
  await Event.create({
    caseId,
    type: nextState,
    fromState: current,
    toState: nextState,
    actor
  });

  // Handle deadlines
  if (nextState === "APPEARANCE_ENTERED") {
    await Deadline.create({
      caseId,
      type: "DEFENCE_DUE",
      dueDate: addDays(new Date(), 14)
    });
  }

  return caseItem;
}