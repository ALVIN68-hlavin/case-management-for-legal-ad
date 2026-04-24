import { useEffect, useState } from "react";
import { getCases } from "../api/caseApi";
import { useNavigate } from "react-router-dom";

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCases().then(res => setCases(res.data));
  }, []);

  return (
    <div>
      <h2>Cases</h2>

      {cases.map(c => (
        <div
          key={c._id}
          onClick={() => navigate(`/cases/${c._id}`)}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h3>{c.title}</h3>
          <p>Status: {c.status}</p>
        </div>
      ))}
    </div>
  );
}