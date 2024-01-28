import React from 'react'
import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles["not-found"]}>
            <div>
                <h2>404</h2>
                <p>Opppppsss, pagina nu a fost găsită.</p>
                <button className="--btn">
                    <Link to="/">&larr; Înapoi pe pagina principală</Link>
                </button>
            </div>
        </div>
    );
}

export default NotFound