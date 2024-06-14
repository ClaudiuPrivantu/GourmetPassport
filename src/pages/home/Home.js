import React from 'react';
import Slider from '../../components/slider/Slider';
import AboutUs from '../../components/aboutUs/AboutUs';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.homeStylish}>
      <div className={styles.content}>
        <Slider />
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;
