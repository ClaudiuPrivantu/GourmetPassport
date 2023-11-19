import React from 'react'
import { useState } from 'react'
import styles from './Auth.module.scss'
import resetImg from './../../assets/reset.jpg'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../../firebase/config"
import Loader from './../../components/loader/Loader'

const Reset = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault()
        setIsLoading(true)

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Verificați-vă email-ul pentru pentru un link de resetare a parolei!")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={resetImg} alt="Reset password" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Resetare parolă</h2>
                        <form onSubmit={resetPassword}>
                            <input
                                type="text"
                                placeholder="Email"
                                required value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Resetare parolă
                            </button>
                            <div className={styles.links}>
                                <p>
                                    <Link to="/login">Login</Link>
                                </p>
                                <p>
                                    <Link to="/register">Înregistrați-vă</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Reset