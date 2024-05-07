import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormButton,
  FormCheckbox,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextArea,
} from "semantic-ui-react";

import styles from "./SignupBabysitter.module.css";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";

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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <BackgroundSVG />

      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Sign Up</h1>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup widths="equal">
            <FormInput
              label="Full Name"
              placeholder="Full Name"
              {...register("name", { required: "Please provide a name" })}
            />
            <FormInput
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
              label="Age"
              placeholder="Age"
              {...register("age", { required: "Please provide your age" })}
            />
            <FormSelect
              label="Gender"
              className={styles.dropDown}
              options={options}
              placeholder="Gender"
              {...register("gender", { required: "Please select an option" })}
            />
          </FormGroup>

          <FormGroup widths="equal">
            <FormInput
              label="Phone Number"
              placeholder="Phone Number"
              {...register("Phone Number", {
                required: "Please provide a phone number",
              })}
            />
            <FormSelect
              label="Experience"
              className={styles.dropDown}
              options={experience}
              placeholder="Experience"
              {...register("experience", {
                required: "Please select an option",
              })}
            />
          </FormGroup>

          {/* <FormInput label="WORKING HOURS" /> */}

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

export default SignupBabySitter;
