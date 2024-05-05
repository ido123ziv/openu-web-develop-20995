import styles from "./FieldValueError.module.css";

interface FieldValueProps {
  errorMessage: string;
}

const FieldValueError = ({ errorMessage }: FieldValueProps) => {
  return <li className={styles.errorItem}>{errorMessage}</li>;
};

export default FieldValueError;
