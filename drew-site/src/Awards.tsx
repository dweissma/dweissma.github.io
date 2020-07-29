import React from "react";
import { AwardObject } from "./AwardObject";

export interface AwardsProps{
    data: any;
}

export function Awards(props: AwardsProps){
    return(
        <div
      className="resume-section"
      id="awards_section">
      <header className="resume-section-header">
        <p>Awards</p>
      </header>
      <div className="awards-content">
        <div className="awards-container">
          {props.data
            .map((award: any) => (
              <AwardObject data={award} key={award.Title} />
            ))}
        </div>
      </div>
    </div>
    );
}