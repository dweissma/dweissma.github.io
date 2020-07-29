import React from "react";

export interface EducationProps {
  data: any;
}
export function Education(props: EducationProps) {

  return (
    <div className="resume-section">
      <header className="resume-section-header">
        <p>Education</p>
      </header>
      <div className="education-content">
        <div className="left-container">
          <div className="image">
            <img src={process.env.PUBLIC_URL + "/img/" + props.data.Image } />
          </div>
        </div>
        <div className="main-container">
          <div className="school-name">
            <h3>{props.data.School}</h3>
          </div>
          <div className="degrees">
            <ul>
              {props.data.Degrees.map((degree: any) => {
                return <li key={degree}>{degree}</li>;
              })}
            </ul>
          </div>
          <div className="GPA">
            <p>GPA: {props.data.GPA}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
