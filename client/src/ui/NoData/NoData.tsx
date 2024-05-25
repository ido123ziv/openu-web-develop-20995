import styles from "./Nodata.module.css";

interface NoDataProps {
  role: string;
}

const parentNodataMessage = "Sorry, No available babysitters yet";
const babysitterNodataMessage = "Sorry, No Reviews Yet";
const moderatorNodataMessage = "No Users";

const Nodata = ({ role }: NoDataProps) => {
  return (
    <div className={styles.message}>
      {role === "parents" && parentNodataMessage}

      {role === "babysitter" && babysitterNodataMessage}

      {role === "moderator" && moderatorNodataMessage}
    </div>
  );
};

export default Nodata;
