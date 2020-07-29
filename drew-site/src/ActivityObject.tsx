import React from "react";

export interface ActivityObjectProps {
  data: any;
}
export function ActivityObject(props: ActivityObjectProps) {
  return (
    <div className="activity-object">
        <div className="organization"><h3>{ props.data.Organization }</h3></div>
        {
            props.data.Positions != null ?
            <ul>{props.data.Positions.map((position:any) => <li key={position.Title}>
                <div className="position-description"><p><b>{position.Title}:</b> <i>({ position.DateRange ? position.Date.join("-") : position.Date.join(", ") })</i> { position.Description }</p></div>
                </li>)}</ul>
            : <div className="position-description"><p><i>({ props.data.DateRange ? props.data.Date.join("-") : props.data.Date.join(", ") })</i> {props.data.Description}</p>
            </div>
        }
    </div>
  );
}
