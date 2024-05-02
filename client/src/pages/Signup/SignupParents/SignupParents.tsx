import {
  FormSelect,
  FormInput,
  FormGroup,
  FormButton,
  Form,
  FormTextArea,
  FormCheckbox,
} from "semantic-ui-react";
import { useForm, FieldValues } from "react-hook-form";

import styles from "./SignupParents.module.css";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";

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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <BackgroundSVG />

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
            />
          </FormGroup>

          <FormGroup widths="equal">
            <FormInput
              label="Password"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Please provide a password",
                minLength: {
                  value: 4,
                  message: "Password must have at least 4 characters",
                },
              })}
            />

            <FormInput
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              {...register("", {
                required: "Please provide a password",
                minLength: {
                  value: 4,
                  message: "Password must have at least 4 characters",
                },
                validate: (value) =>
                  value === getValues("password") || "Password must match",
              })}
            />
          </FormGroup>

          <FormGroup widths="equal">
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
          </FormGroup>

          <FormGroup widths="equal">
            <FormInput
              label="Phone Number"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Please provide a phone number",
              })}
            />
            <FormSelect
              label="Gender"
              className={styles.dropDown}
              options={options}
              placeholder="Gender"
              {...register("gender", { required: "Please select a gender" })}
            />
          </FormGroup>

          <FormGroup widths="equal">
            <FormInput
              label="Youngest Child Age"
              {...register("minKidAge", {
                required: "Please provide a value",
              })}
            />
            <FormInput
              label="Eldest Child Age"
              {...register("maxKidAge", {
                required: "Please provide a value",
              })}
            />
            <FormInput
              placeholder="Total number of kids"
              label="Total Number of Kids"
              {...register("numOfKids", {
                required: "Please provide a value",
              })}
            />
          </FormGroup>
          <FormTextArea
            label="Comments"
            placeholder="Tell us more about you or the children"
          />

          <FormGroup className={styles.checkbox}>
            <FormCheckbox
              label="I agree to the Terms and Conditions"
              className={styles.checkbox}
              {...register("", {
                required: "Please check this box",
              })}
            />
          </FormGroup>

          <FormGroup>
            <FormButton size="large" className={styles.submitButton}>
              Submit
            </FormButton>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default SignupParents;
