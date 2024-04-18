import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormButton,
  FormGroup,
  FormInput,
  FormSelect,
} from "semantic-ui-react";

import styles from "./SignupBabysitter.module.css";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const experience = [
  { key: 0, text: "No Experience", value: 0 },
  { key: 1, text: "1-3", value: 1 },
  { key: 2, text: "3+", value: 2 },
];

const SignupBabySitter = () => {
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
        <FormGroup widths="equal" className={styles.firstRow}>
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
          />
          <FormInput
            label="Password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Please provide a password",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
        </FormGroup>
        <FormGroup widths="equal" className={styles.secondRow}>
          <FormInput
            label="City"
            placeholder="City"
            {...register("city", { required: "Please provide a city" })}
          />
          <FormInput
            label="Street"
            placeholder="Street"
            {...register("street", { required: "Please provide a street" })}
          />
          <FormSelect
            label="Gender"
            className={styles.dropDown}
            options={options}
            placeholder="Gender"
            {...register("gender", { required: "Please select an option" })}
          />
          <FormSelect
            label="Experience"
            className={styles.dropDown}
            options={experience}
            placeholder="Experience"
            {...register("experience", { required: "Please select an option" })}
          />
        </FormGroup>

        <FormGroup className={styles.submitContainer}>
          <FormButton>Submit</FormButton>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SignupBabySitter;
