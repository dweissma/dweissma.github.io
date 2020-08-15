import React, { Fragment } from "react";

import { Contact } from "./Contact"

export interface AboutProps {
}

export function About(props: AboutProps) {
  return (
    <Fragment>
        <div className="About">
        <header className="About-header">
            <p>About me</p>
        </header>
        <p>
            I'm a 4th year biology, computer science, and mathematics student at Indiana University. I'm also a member of the <a href="https://pages.iu.edu/~kshao/">Computational Risk Assessment Laboratory</a> the President of Wells Quad Student Government and a garlic bread connoisseur. In my free time I enjoy cooking, playing basketball, and watching cartoons. I'm also looking for a job, so here's my resume as a <a href={process.env.PUBLIC_URL + "/resumes/Resume.pdf"} download="DrewWeissmann.pdf">pdf</a> and <a href={process.env.PUBLIC_URL + "/resumes/Resume.docx"} download="DrewWeissmann.docx">Word Document</a> or <a href="../resume">see the interactive version</a>
        </p>
        </div>
        <Contact />    
    </Fragment>

  );
}
