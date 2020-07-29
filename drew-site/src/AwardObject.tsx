import React from "react";

export interface AwardObjectProps {
  data: any;
}
export function AwardObject(props: AwardObjectProps) {
  return (
    <div className="award-object">
      <div className="award-title">
        <h3>{props.data.Title}</h3>
      </div>
      <div className="award-time">
        <i><h5>{props.data.DateRange ? props.data.Dates.join("-") : props.data.Dates.join(", ")}</h5></i>
      </div>
      <div>
        <p>{props.data.Description}</p>
      </div>
    </div>
  );
}
