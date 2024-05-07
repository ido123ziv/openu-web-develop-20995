import styles from "./FieldValueError.module.css";

interface FieldValueProps {
  errorMessage: string;
}

const FieldValueError = ({ errorMessage }: FieldValueProps) => {
  return <p className={styles.errorItem}>{errorMessage}</p>;
};

export default FieldValueError;
