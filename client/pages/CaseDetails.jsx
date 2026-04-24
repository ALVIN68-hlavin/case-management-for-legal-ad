import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCaseById,
  getCaseEvents,
  getDeadlines
} from "../api/caseApi";

import CaseTimeline from "../components/CaseTimeline";
import NextActions from "../components/NextActions";
import DeadlineList from "../components/DeadlineList";

export default function CaseDetails() {
  const { id } = useParams();

  const [caseData, setCaseData] = useState(null);
  const [events, setEvents] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const uploadDocument = async (file, type) => {
      const form = new FormData();
      form.append("file", file);
      form.append("type", type);
    
      await axios.post(`/cases/${id}/documents`, form);
      refreshCase();
    };

  const refreshCase = async () => {
    const res = await getCaseById(id);
    setCaseData(res.data);
  
    const eventsRes = await getCaseEvents(id);
    setEvents(eventsRes.data);
  
    const deadlineRes = await getDeadlines(id);
    setDeadlines(deadlineRes.data);
  };

  useEffect(() => {
    refreshCase();
  }, [id]);

  if (!caseData) return <p>Loading...</p>;

  return (
    <div>
      <h2>{caseData.title}</h2>
      <p>Status: {caseData.status}</p>

      <NextActions caseData={caseData} onUpdate={refreshCase} />  
      <h3>Timeline</h3>
      <CaseTimeline events={events} />

      <h3>Deadlines</h3>
      <DeadlineList deadlines={deadlines} />
    </div>
  );
}