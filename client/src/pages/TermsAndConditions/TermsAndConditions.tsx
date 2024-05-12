import { Icon } from "semantic-ui-react";

import BackgroundSVG from "../../ui/BackgroundSVG/BackgroundSVG";
import styles from "./TermsAndConditions.module.css";

const TermsAndConditions = () => {
  return (
    <>
      <BackgroundSVG />

      <div className={styles.termsContainer}>
        <Icon size="huge" name="newspaper outline" />
        <h2>Terms and Conditions</h2>
        <p>
          Welcome to Taf, the platform connecting parents with babysitters. By
          using our website, you agree to comply with and be bound by the
          following terms and conditions of use:
        </p>

        <h3>Acceptance of Terms</h3>
        <p>
          By accessing or using Taf, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and Conditions.
        </p>

        <h3>Service Description</h3>
        <p>
          Taf provides a platform for parents to connect with babysitters for
          childcare services. We do not employ babysitters nor are we
          responsible for the conduct of any user.
        </p>

        <h3>User Responsibilities</h3>
        <p>
          Parents and babysitters are solely responsible for their interactions
          with each other. Taf does not verify the identity or background of
          users. It is your responsibility to exercise caution and use your
          judgment when interacting with others on our platform.
        </p>

        <h3>Fees and Payments</h3>
        <p>
          While registration on Taf is free, fees may apply for certain premium
          features or services. Payment for babysitting services is negotiated
          directly between the parent and babysitter.
        </p>

        <h3>Content</h3>
        <p>
          Users are responsible for the content they post on Taf. Any content
          that violates our Community Guidelines or is deemed inappropriate may
          be removed at our discretion.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          Taf is not liable for any damages resulting from the use of our
          platform. We do not guarantee the accuracy, reliability, or quality of
          any content or services provided by users.
        </p>

        <h3>Governing Law</h3>
        <p>
          These Terms and Conditions are governed by the laws of Israel. Any
          disputes arising from or relating to these terms shall be subject to
          the exclusive jurisdiction of the courts in Israel. By using Taf, you
          agree to abide by these terms and conditions. If you do not agree with
          any part of these terms, please do not use our platform.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
