import React from "react";
import { ActivityObject } from "./ActivityObject";

export interface ActivitiesProps{
    data: any;
}

export function Activities(props: ActivitiesProps){
    return(
        <div
      className="resume-section"
      id="activities_section">
      <header className="resume-section-header">
        <p>Activities</p>
      </header>
      <div className="activities-content">
        <div className="activities-container">
          {props.data
            .map((activity: any) => (
              <ActivityObject data={activity} key={activity.Organization} />
            ))}
        </div>
      </div>
    </div>
    );
}