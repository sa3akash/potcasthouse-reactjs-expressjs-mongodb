import React from "react";
import styles from "./Home.module.css";
import { useNavigate  } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const Home = () => {
const navigate = useNavigate()
  function authenticateStart(){
    navigate("/authenticate")
  }
  return (
    <div className={styles.home}>
      <Card title="Welcome to Potcasthouse!" icon="logo">
        <p className={styles.cardParagraph}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>

        <Button onClick={authenticateStart} text="Let's go!"/>
        <div className={styles.homeSignin}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;

