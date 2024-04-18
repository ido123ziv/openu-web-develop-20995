import {
  FormSelect,
  FormInput,
  FormGroup,
  FormButton,
  Form,
} from "semantic-ui-react";
import { useForm, FieldValues } from "react-hook-form";

import styles from "./SignupParents.module.css";
import { useState } from "react";

type Kids = {
  age: number;
  gender: "male" | "female" | "other";
};

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const SignupParents = () => {
  const [numOfChildren, setNumOfChildren] = useState<number>(1);
  const [childrenArr, setChildrenArr] = useState<Kids[] | null>([]);

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
            {...register("gender", { required: "Please select a gender" })}
          />
          <FormButton
            fluid
            className={styles.addChildrenButton}
            onClick={() => setNumOfChildren((prevNum) => prevNum + 1)}
          >
            Add Child
          </FormButton>
        </FormGroup>
        <FormGroup widths="equal" className={styles.childrenFields}>
          {Array.from({ length: numOfChildren }).map((_, index) => (
            <div key={index} className={styles.childRow}>
              <FormInput label="Child's Name" placeholder="Child's Name" />
              <FormInput label="Child's Age" placeholder="Child's Age" />
              <FormButton
                onClick={() => setNumOfChildren((prevNum) => prevNum - 1)}
              >
                -
              </FormButton>
            </div>
          ))}
        </FormGroup>
        <FormGroup className={styles.submitContainer}>
          <FormButton>Submit</FormButton>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SignupParents;
