export default function CaseTimeline({ events }) {
  return (
    <div>
      {events.map(e => (
        <div key={e._id} style={{ marginBottom: 10 }}>
          <strong>{e.toState}</strong>
          <p>From: {e.fromState}</p>
          <p>Date: {new Date(e.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}