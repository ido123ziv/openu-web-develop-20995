interface FieldValueProp {
  errorMessage: string;
}

const FieldValueError = ({ errorMessage }: FieldValueProp) => {
  return <li>{errorMessage}</li>;
};

export default FieldValueError;
