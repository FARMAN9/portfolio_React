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
      setResult("Email Send Successfully \n Thanks😇");
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
      <div className='contact-title'>
        <h1>Get in touch</h1>
        <img src={bac} alt="" />
      </div>
      <div className='contact-section'>
        <div className='contact-left'>
          <h1>Let's talk</h1>
          <p>I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail} alt="" /> <p>saeedfarman9@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={call} alt="" /><p>+916005943382</p>
            </div>
            <div className="contact-detail">
              <img src={loc} alt="" /><p>Jammu & Kashmir, India</p>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={onSubmit} className='contact-right'>
            <label htmlFor=""> Your Name</label>
            <input type="text" placeholder='Enter your name' name='name' />
            <label htmlFor=""> Your Email</label>
            <input type="email" placeholder='Enter your email' name='email' />
            <label htmlFor=""> Write your message here</label>
            <textarea placeholder='Enter your message' rows='8' name='message'></textarea>
            <button className='contact-submit' type='submit'>Submit now</button>
          </form>
        </div>
      </div>
      
      {alertVisible && (
        <div className="custom-alert">
          <div className="custom-alert-content">
            <p>{result}</p>
            <button onClick={closeAlert}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
