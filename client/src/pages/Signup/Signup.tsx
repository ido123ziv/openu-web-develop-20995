import {
  FormTextArea,
  FormSelect,
  FormRadio,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormButton,
  Form,
} from "semantic-ui-react";

import styles from "./Signup.module.css";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const Signup = () => {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.h1}>Sign Up</h1>
      <Form size="large" className={styles.form}>
        <FormGroup widths="equal">
          <FormInput fluid label="Full Name" placeholder="Full Name" />
          <FormInput fluid label="Email" placeholder="Email" />
          <FormSelect
            fluid
            label="Gender"
            options={options}
            placeholder="Gender"
          />
        </FormGroup>
        <FormGroup inline>
          <label>Size</label>
          <FormRadio
            label="Small"
            value="sm"
            //   checked={value === "sm"}
            //   onChange={this.handleChange}
          />
          <FormRadio
            label="Medium"
            value="md"
            //   checked={value === "md"}
            //   onChange={this.handleChange}
          />
          <FormRadio
            label="Large"
            value="lg"
            //   checked={value === "lg"}
            //   onChange={this.handleChange}
          />
        </FormGroup>
        <FormTextArea label="About" placeholder="Tell us more about you..." />
        <FormCheckbox label="I agree to the Terms and Conditions" />
        <FormButton>Submit</FormButton>
      </Form>
    </div>
  );
};

export default Signup;
