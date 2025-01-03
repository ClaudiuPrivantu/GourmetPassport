import React from 'react'
import { useState } from 'react'
import styles from './Auth.module.scss'
import registerImg from './../../assets/register.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase/config"
import Loader from './../../components/loader/Loader'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Parolele nu se potrivesc!")
        }
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user)
                setIsLoading(false)
                toast.success("V-ați înregistrat cu succes!")
                navigate("/")

            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Înregistrează-te</h2>
                        <form onSubmit={registerUser}>
                            <input
                                type="text"
                                placeholder="Email"
                                required value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Parolă"
                                required value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirmare parolă"
                                required value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                            />

                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Înregistrează-te
                            </button>
                        </form>
                        <span className={styles.register}>
                            <p>
                                Aveți deja un cont?
                            </p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="Register" width="400" />
                </div>
            </section>
        </>
    )
}

export default Register