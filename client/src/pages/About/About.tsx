import { Icon } from "semantic-ui-react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <Icon name="lightbulb outline" size="huge" className={styles.icon} />
      <header>
        <h1>About Taf</h1>
      </header>
      <main>
        <section>
          <h2>Our Mission</h2>
          <p>
            At Taf, we are dedicated to simplifying the lives of parents by
            providing a platform that helps them find the perfect babysitter for
            their children. Our mission is to empower parents to manage their
            family life more effectively by connecting them with trustworthy and
            reliable caregivers.
          </p>
        </section>
        <section>
          <h2>Our Approach</h2>
          <p>
            At Taf, we prioritize parents. We understand the challenges and
            responsibilities that come with raising a family, which is why our
            platform is designed with a parents-first approach. We are committed
            to providing a safe and secure environment where parents can
            confidently find the ideal babysitter for their children.
          </p>
        </section>
        <section>
          <h2>Our Values</h2>
          <ul>
            <li>
              <Icon name="handshake" />
              <strong>Trust:</strong> We prioritize trust and reliability in
              every interaction, ensuring peace of mind for parents and
              caregivers alike.
            </li>
            <li>
              <Icon name="chart line" />
              <strong>Quality:</strong> We uphold high standards of quality in
              our services, connecting families with experienced and caring
              babysitters.
            </li>
            <li>
              <Icon name="home" />
              <strong>Community:</strong> We foster a supportive community where
              parents can share experiences, resources, and advice, creating a
              network of support.
            </li>
            <li>
              <Icon name="clock outline" />
              <strong>Flexibility:</strong> We understand that every family is
              unique, so we offer flexible solutions to accommodate varying
              needs and schedules.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
