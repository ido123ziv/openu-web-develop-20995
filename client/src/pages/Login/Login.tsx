import { Form, FormButton, FormGroup, FormInput } from "semantic-ui-react";

import styles from "./Login.module.css";
import { FieldValues, useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmit = (data: FieldValues) => {};

  return (
    <>
      <div className={styles.background} />

      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Login</h1>
        <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup className={styles.inputGroup}>
            <FormInput
              label="Email"
              required
              placeholder="Email"
              {...register("email", {
                required: "Please provide an email address",
              })}
            />
          </FormGroup>
          <FormGroup className={styles.inputGroup}>
            <FormInput
              // fluid // Add fluid prop to take up full width
              label="Password"
              required
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
          <FormGroup className={styles.submitContainer}>
            <FormButton>Submit</FormButton>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default Login;
