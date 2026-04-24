import { getDaysLeft } from "../utils/date.js";



export default function DeadlineList({ deadlines }) {

    export default function DeadlineList({ deadlines }) {
      return (
        <div>
          {deadlines.map(d => {
            const daysLeft = getDaysLeft(d.dueDate);
        
            return (
              <div key={d._id}>
                <strong>{d.type}</strong>
            
                <p>Due: {new Date(d.dueDate).toDateString()}</p>
            
                {daysLeft < 0 && (
                  <p style={{ color: "red" }}>⚠ Missed Deadline</p>
                )}
    
                {daysLeft <= 2 && daysLeft >= 0 && (
                  <p style={{ color: "orange" }}>
                    ⏳ Due in {daysLeft} day(s)
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    }
  return (
    <div>
      {deadlines.map(d => (
        <div key={d._id}>
          <strong>{d.type}</strong>
          <p>Due: {new Date(d.dueDate).toDateString()}</p>
          <p>Status: {d.status}</p>
        </div>
      ))}
    </div>
  );
}