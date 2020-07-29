import React, { useState, useEffect } from "react";
import ResumeData from "./resumes/Resume.json";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { TechnicalSkills } from "./TechnicalSkills";
import { Awards } from "./Awards";
import { Activities } from "./Activities";
import { unregister } from "./serviceWorker";


export interface ResumeProps {}

export enum ResumeSections {
  Education,
  Experience,
  TechnicalSkills,
  Awards,
  Activities,
}

export function AdvanceSections(section: ResumeSections) {
  if (section === ResumeSections.Education) {
    return ResumeSections.Experience;
  } else if (section === ResumeSections.Experience) {
    return ResumeSections.TechnicalSkills;
  } else if (section === ResumeSections.TechnicalSkills) {
    return ResumeSections.Awards;
  } else if (section === ResumeSections.Awards) {
    return ResumeSections.Activities;
  } else {
    return null;
  }
}

export function PreviousSection(section: ResumeSections) {
  if (section === ResumeSections.Experience) {
    return ResumeSections.Education;
  } else if (section === ResumeSections.TechnicalSkills) {
    return ResumeSections.Experience;
  } else if (section === ResumeSections.Awards) {
    return ResumeSections.TechnicalSkills;
  } else if (section === ResumeSections.Activities) {
    return ResumeSections.Awards;
  } else {
    return null;
  }
}

export function Resume(props: ResumeProps) {
  const [section, setSection] = useState(ResumeSections.Education);
  const [canScroll, setCanScroll] = useState(true);
  setTimeout(()=> {
      if(!canScroll){
          setCanScroll(true);
      }
  }, 300)
  var start = 0;
  var end = 0;
  const minDist = 40;
  const maxDist = 60;
  const handleKey = (e: any) => {
    if(document.body.clientHeight > window.innerHeight){
        return; //Let the scroll listener do the work
    }
    if(e.key == "ArrowUp"){
        setSection(PreviousSection(section) ?? ResumeSections.Education);
    }
    else if(e.key == "ArrowDown"){
        setSection(AdvanceSections(section) ?? ResumeSections.Activities);
    }
}
  var lastScrollTop = 0;
  const handleScroll = (e: any) =>{  
    const delta = lastScrollTop - window.scrollY ;
    console.log(window.pageYOffset);
    console.log(window.innerHeight);
    console.log(document.body.offsetHeight);
    if(delta > 0 && canScroll && window.pageYOffset < 1){
        setSection(PreviousSection(section) ?? ResumeSections.Education);
    }
    else if(canScroll && Math.abs(window.pageYOffset + window.innerHeight - document.body.offsetHeight - 60) < 1){
        setSection(AdvanceSections(section) ?? ResumeSections.Activities);
    }
    lastScrollTop = window.scrollY;
  }
  useEffect(()=>{
      document.body.addEventListener("keydown", handleKey);
      window.addEventListener("scroll", handleScroll);
      return (()=> {
          document.body.removeEventListener("keydown", handleKey);
          window.removeEventListener("scroll", handleScroll);
        });
  })
  
  return (
    <div className="Resume" id="resume"
    onWheel={(e) => {
        if(document.body.clientHeight > window.innerHeight){
            return; //Let the scroll listener do the work
        }
        if (e.deltaY < 0 && canScroll && window.pageYOffset === 0) {
          setSection(PreviousSection(section) ?? ResumeSections.Education);
        } else  if(canScroll){
          setSection(AdvanceSections(section) ?? ResumeSections.Activities);
        }
        setCanScroll(false);
      }}
      onTouchStart={(e) => {
        start = e.touches[0].screenY;
      }}
      onTouchMove={(e) => {
        end = e.touches[0].screenY;
      }}
      onTouchEnd={(e) => {
        if (start - end > minDist && start - end < maxDist) {
          setSection(AdvanceSections(section) ?? ResumeSections.Activities);
        } else if (end - start > minDist && end - start < maxDist) {
          setSection(PreviousSection(section) ?? ResumeSections.Education);
        }
        start = 0;
        end = 0;
      }}
    >
      <div
        className="resume-container"
        
      >
        {section === ResumeSections.Education ? <Education data={ResumeData.Education} /> : section === ResumeSections.Experience ? <Experience data={ResumeData.Experience} /> : section === ResumeSections.TechnicalSkills ? <TechnicalSkills data={ResumeData.TechnicalSkills} /> : section === ResumeSections.Awards ? <Awards data={ResumeData.Awards} /> : section === ResumeSections.Activities ? <Activities data={ResumeData.Activities} /> : <p>In Progress</p>}
        </div>
      <div className="right-container">
        <div className="outer-jumplink">
            <div className={section === ResumeSections.Education ? "active-inner-jumplink": "inactive-inner-jumplink"} onClick={()=> setSection(ResumeSections.Education)} title="Education" />
        </div>
        <div className="outer-jumplink">
            <div className={section === ResumeSections.Experience ? "active-inner-jumplink": "inactive-inner-jumplink"} onClick={()=> setSection(ResumeSections.Experience)} title="Experience" />
        </div>
        <div className="outer-jumplink">
            <div className={section === ResumeSections.TechnicalSkills ? "active-inner-jumplink": "inactive-inner-jumplink"} onClick={()=> setSection(ResumeSections.TechnicalSkills)} title="Technical Skills" />
        </div>
        <div className="outer-jumplink">
            <div className={section === ResumeSections.Awards ? "active-inner-jumplink": "inactive-inner-jumplink"} onClick={()=> setSection(ResumeSections.Awards)} title="Awards" />
        </div>
        <div className="outer-jumplink">
            <div className={section === ResumeSections.Activities ? "active-inner-jumplink": "inactive-inner-jumplink"} onClick={()=> setSection(ResumeSections.Activities)} title="Activities" />
        </div>
      </div>
    </div>
  );
}
