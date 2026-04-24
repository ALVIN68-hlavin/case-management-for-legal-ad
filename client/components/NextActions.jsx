import { updateCaseState } from "../api/caseApi";

import { useAuth } from "../hooks/useAuth";

const TRANSITIONS = {
  FILED: ["SUMMONS_ISSUED"],
  SUMMONS_ISSUED: ["SERVED"],
  SERVED: ["APPEARANCE_ENTERED"],
  APPEARANCE_ENTERED: ["DEFENCE_FILED"],
  DEFENCE_FILED: ["PLEADINGS_CLOSED"]
};

export default function NextActions({ caseData, onUpdate }) {
  const { user } = useAuth();

  const nextStates = TRANSITIONS[caseData.status] || [];

  // Role restriction
  const roleAllowed = {
    LAWYER: nextStates,
    PARALEGAL: [],
    CLIENT: [],
    ADMIN: nextStates
  };

  const allowedStates = roleAllowed[user.role] || [];

  return (
    <div>
      <h3>Next Actions</h3>

      {allowedStates.length === 0 && (
        <p>No actions available for your role</p>
      )}

      {allowedStates.map(state => (
        <button
          key={state}
          onClick={() => onUpdate(state)}
        >
          {state}
        </button>
      ))}
    </div>
  );
}