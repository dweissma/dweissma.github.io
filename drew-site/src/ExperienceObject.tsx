import React, { useState } from "react";

export interface ExperienceObjectProps {
  data: any;
}
export function ExperienceObject(props: ExperienceObjectProps) {
  return (
    <div className="experience-object">
      <div className="left-container">
        <div className="image">
          <img src={process.env.PUBLIC_URL + "/img/" + props.data.Image} />
        </div>
      </div>
      <div className="main-container">
        <div className="company"><h3>{props.data.Organization}{props.data.SubOrganization != null ? ": " + props.data.SubOrganization : ""}</h3></div>
        <div className="position"><i><h5>{props.data.Position}</h5></i></div>
        <div className="description"><p>{props.data.Description}</p></div>
        <div className="languages"><p><b>{props.data.ProgrammingLanguages.length > 1 ? "Programming Languages: " : "Programming Language: "}</b>{props.data.ProgrammingLanguages.join(", ")}</p></div>
      </div>
    </div>
  );
}
