import React from 'react';
import styles from './AboutUs.module.scss';
import Card from '../../components/card/Card';
import { FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const AboutUs = () => {
    return (
        <section>
            <div className={`container ${styles.about}`}>
                <h2>Despre Noi</h2>
                <div className={styles.section}>
                    <div className={styles.details}>
                        <Card cardClass={styles.card}>
                            <h3>Cine suntem</h3>
                            <p>
                                Gourmet Passport este viitor lider în industria gastronomică din România, oferind o experiență culinară unică și memorabilă clienților noștri. Cu o echipă dedicată de experți culinari, suntem mândri să aducem cele mai bune preparate direct la ușa ta.
                            </p>
                        </Card>
                        <Card cardClass={styles.card}>
                            <h3>Valorile Noastre</h3>
                            <p>
                                Credem în calitate, integritate și inovație. Fiecare produs pe care îl oferim este rezultatul unui angajament de neclintit față de excelență și satisfacția clienților noștri.
                            </p>
                        </Card>
                        <Card cardClass={styles.card}>
                            <h3>Misiunea noastră</h3>
                            <p>
                                Cu GourmetPassport, pasionații de gătit nu mai trebuie să-și sacrifice ore prețioase în căutarea ingredientelor. Simplu și eficient, serviciul nostru vă oferă acces la o gamă vastă de rețete autentice, alături de toate ingredientele necesare, livrate la ușa voastră într-un pachet elegant.
                            </p>
                        </Card>
                        <Card cardClass={styles.card}>
                            <h3>Contact</h3>
                            <p>Ne puteți găsi folosind detaliile de mai jos:</p>
                            <div className={styles.icons}>
                                <span>
                                    <p>0744 925 306</p>
                                    <FaPhoneAlt />
                                </span>
                                <span>
                                    <p>Timișoara, România</p>
                                    <FaLocationDot />
                                </span>
                                <span>
                                    <p>@GourmetPassport</p>
                                    <FaInstagram />
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;