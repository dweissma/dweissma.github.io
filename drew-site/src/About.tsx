import React from "react";

export interface AboutProps {}

export function About(props: AboutProps) {
  return (
    <div className="About">
      <header className="About-header">
        <p>About me</p>
      </header>
      <p>
        I'm a 4th year biology, computer science, and mathematics student at Indiana University. I'm also a member of the <a href="https://pages.iu.edu/~kshao/">Computational Risk Assessment Laboratory</a> the President of Wells Quad Student Government and a garlic bread connoisseur. In my free time I enjoy cooking, playing basketball, and running. I'm also looking for a job, so here's my resume as a <a href="../build/static/resumes/Resume.pdf" download="DrewWeissmann.pdf">pdf</a> and <a href="../build/static/resumes/Resume.docx" download="DrewWeissmann.docx">Word Document</a>
      </p>
    </div>
  );
}
