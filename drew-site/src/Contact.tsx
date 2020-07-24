import React from "react";
import { ReactComponent as Email } from './img/mail.svg';
import { ReactComponent as Phone } from './img/phone.svg';
import { ReactComponent as Mailbox } from './img/mailbox.svg'

export interface ContactProps {
}

export function Contact(props: ContactProps) {
  return (
    <div className="Contact">
      <header className="Contact-header">
        <p>Contact Me</p>
      </header>
      <div className="content">
        <div className="email"><Email /><p>Email Me: <a href="mailto:dweissmann1999@gmail.com">dweissmann1999@gmail.com</a></p></div>
        <div className="phone"><Phone /><p>Call Me: (812) 584-2316</p></div>
        <div className="address"><Mailbox /><p>Mail Me Something: 1021 E 3rd St, Bloomington, IN 47405</p></div>
      </div>
    </div>
  );
}
