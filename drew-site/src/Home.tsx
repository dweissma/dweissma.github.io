import React from "react";


export interface HomeProps{

}

export function Home(props: HomeProps){
    return(
        <div className="Home">
        <header className="Home-header">
          <p>Welcome to my site</p>
        </header>
      </div>
    );
}