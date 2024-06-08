import styles from "./Nodata.module.css";

interface NoDataProps {
  role: string;
  message?: string;
}

const parentNodataMessage = "Sorry, No available babysitters yet";
const babysitterNodataMessage = "Sorry, No Reviews Yet";
const moderatorNodataMessage = "No Users";

const Nodata = ({ role, message }: NoDataProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        {role === "parents" && parentNodataMessage}

        {role === "babysitter" && babysitterNodataMessage}

        {role === "moderator" && moderatorNodataMessage}

        {message}
      </p>
    </div>
  );
};

export default Nodata;
