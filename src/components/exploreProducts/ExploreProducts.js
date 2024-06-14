import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExploreProducts.module.scss';

const ExploreProducts = () => {
    return (
        <div className={styles.exploreSection}>
            <div className={styles.container}>
                <h2>Explorează preparatele noastre</h2>
                <p>Descoperă o varietate de preparate delicioase și autentice.</p>
                <div className={styles.buttonContainer}>
                    <Link to="/products">
                        <button className={`${styles.button} --btn --btn-primary`}>Vezi Preparatele</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExploreProducts;