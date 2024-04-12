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
import { useForm, FieldValues } from "react-hook-form";

import styles from "./SignupParents.module.css";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const SignupParents = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmit = (data: FieldValues) => {};

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.h1}>Sign Up</h1>
      <Form
        size="large"
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup widths="equal">
          <FormInput
            fluid
            label="Full Name"
            placeholder="Full Name"
            {...register("name", { required: "Please provide a name" })}
          />
          <FormInput
            fluid
            label="Email"
            placeholder="Email"
            {...register("email", {
              required: "Please provide an email address",
            })}
          />{" "}
          <FormInput
            fluid
            label="Password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Please provide a password",
              minLength: {
                value: 6,
                message: "password must have at least 6 characters",
              },
            })}
          />
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

export default SignupParents;
