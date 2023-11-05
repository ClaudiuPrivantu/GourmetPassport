import React from 'react'
import { useState } from 'react'
import styles from './Auth.module.scss'
import registerImg from './../../assets/register.jpg'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const registerUser = (e) => {
        e.preventDefault();
        console.log(email,password,cPassword);
    }

    return (
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>
                    <form onSubmit={registerUser}>
                        <input
                            type="text"
                            placeholder="Email"
                            required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            required value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />

                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Register
                        </button>
                    </form>
                    <span className={styles.register}>
                        <p>
                            Already have an account?
                        </p>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </Card>
            <div className={styles.img}>
                <img src={registerImg} alt="Register" width="400" />
            </div>
        </section>
    )
}

export default Register