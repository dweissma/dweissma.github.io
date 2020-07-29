import React, { useState } from "react";
import { ExperienceObject } from "./ExperienceObject";


export interface ExperienceProps {
  data: any;
}
export function Experience(props: ExperienceProps) {
  const [importance, setImportance] = useState(2);
  return (
    <div
      className="resume-section"
      id="experience_section">
      <header className="resume-section-header">
        <p>Experience</p>
      </header>
      <div className="experience-content">
        <div className="buttons">
          {importance < 3 ? <div><button className="btn btn-primary" onClick={()=> setImportance(importance+1)}>Show Less</button></div> : <div />}
          {importance > 1 ? <div><button className="btn btn-primary" onClick={()=> setImportance(importance-1)}>Show More</button></div> : <div />}
        </div>
        <div className="experience-container">
          {props.data
            .filter((exp: any) => exp.Importance >= importance)
            .map((exp: any) => (
              <ExperienceObject data={exp} key={exp.Description} />
            ))}
        </div>
      </div>
    </div>
  );
}
