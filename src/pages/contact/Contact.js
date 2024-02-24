import React, { useRef } from 'react'
import styles from './Contact.module.scss'
import Card from '../../components/card/Card';
import { FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // console.log(form.current);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        'template_3w5nrdi',
        form.current,
        '2MVxhu0_rq9Sa5uN_'
      )
      .then(
        (result) => {
          toast.success("Mesajul a fost trimis cu succes!");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contactează-ne</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Nume:</label>
              <input
                type="text"
                name="user_name"
                placeholder="Nume"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
              <label>Subiect:</label>
              <input
                type="text"
                name="subject"
                placeholder="Subiect"
                required
              />
              <label>Mesaj:</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Trimite mesajul</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Datele noastre de contact</h3>
              <p>Completează formularul sau contactează-ne prin intermediul celorlalte variante de mai jos:</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>0744 925 306</p>
                </span>
                <span>
                  <MdEmail />
                  <p>suport_clienti@GourmetPassport.com</p>
                </span>
                <span>
                  <FaLocationDot />
                  <p>Timișoara, România</p>
                </span>
                <span>
                  <FaInstagram />
                  <p>@GourmetPassport</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact