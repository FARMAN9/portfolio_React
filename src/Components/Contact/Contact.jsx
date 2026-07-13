import React from 'react'
import './Contact.css'
import bac from '../../assets/bac.svg'
import call from '../../assets/call.svg'
import mail from '../../assets/mail.svg'
import loc from '../../assets/loc.svg'

const mykey = "fc7158de-ce59-41ff-9c1e-672e25c721db"

function Contact() {
  const [result, setResult] = React.useState("");
  const [alertVisible, setAlertVisible] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", mykey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully! Thanks 😇");
      setAlertVisible(true);
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
    setResult("");
  };

  return (
    <div id='contact' className='contact'>
      {/* Section heading */}
      <div className='contact-title'>
        <h1>Get in touch</h1>
        <img src={bac} alt="" />
      </div>

      {/* Card wrapper */}
      <div className='contact-card glass-panel'>
        {/* Left info column */}
        <div className='contact-left'>
          <h2>Let's talk</h2>
          <p>I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail} alt="email" />
              <p>saeedfarman9@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={call} alt="phone" />
              <p>+916005943382</p>
            </div>
            <div className="contact-detail">
              <img src={loc} alt="location" />
              <p>Jammu &amp; Kashmir, India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="contact-divider" />

        {/* Right form column */}
        <form onSubmit={onSubmit} className='contact-right'>
          <div className="contact-field">
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" placeholder='Enter your name' name='name' required />
          </div>
          <div className="contact-field">
            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" placeholder='Enter your email' name='email' required />
          </div>
          <div className="contact-field">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" placeholder='Write your message here...' rows='6' name='message' required></textarea>
          </div>
          <button className='contact-submit' type='submit'>
            {result === "Sending...." ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>

      {/* Success / error modal */}
      {alertVisible && (
        <div className="custom-alert" onClick={closeAlert}>
          <div className="custom-alert-content" onClick={e => e.stopPropagation()}>
            <div className="alert-icon">✉️</div>
            <p>{result}</p>
            <button onClick={closeAlert}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
