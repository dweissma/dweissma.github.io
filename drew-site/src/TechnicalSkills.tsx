import React from "react";
import { ReactComponent as Web } from './img/web.svg'; 
import { ReactComponent as Calculator } from './img/calculator.svg';

export interface TechnicalSkillsProps {
  data: any;
}
export function TechnicalSkills(props: TechnicalSkillsProps) {

  return (
    <div className="resume-section">
      <header className="resume-section-header">
        <p>Technical Skills</p>
      </header>
      <div className="technical-skills-content">
        <div className="Languages">
            <div className="image"> <img src={process.env.PUBLIC_URL + "/img/lambda.svg" } /></div><p><b>Languages: </b>{props.data.Languages.join(", ")}</p>
        </div>
        <div className="WebDev">
            <div className="image"><Web /></div><p><b>Web Development: </b>{props.data.WebDevelopment.join(", ")}</p>
        </div>
        <div className="Misc">
            <div className="image"><Calculator /></div><p><b>Misc: </b>{props.data.Misc.join(", ")}</p>
        </div>
      </div>
    </div>
  );}