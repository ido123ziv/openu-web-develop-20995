import {
  FormGroup,
  FormButton,
  Form,
  FormCheckbox,
  FormField,
} from "semantic-ui-react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";

import styles from "./SignupParents.module.css";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import FieldValueError from "../../../ui/FieldValueError/FieldValueError";
import { parentSignup } from "./parentSignupService";
import { useNavigate } from "react-router-dom";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const SignupParents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    control,
    reset,
  } = useForm();
  const [checkedCheckbox, setCheckedCheckbox] = useState<boolean | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["parentSignup"],
    mutationFn: parentSignup,
    onSuccess: async () => {
      console.log("SUCCESS");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      reset();
    },
  });

  const onSubmit = (data: FieldValues) => {
    // console.log(checkedCheckbox);
    if (!checkedCheckbox) {
      return;
    }

    mutate(data);
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
            <FormField>
              {/* <label>Email</label> */}
              <input
                placeholder="Full Name"
                {...register("name", { required: "Please provide a name" })}
              />
              {errors?.name && (
                <FieldValueError errorMessage={`${errors.name.message}`} />
              )}
            </FormField>

            <FormField>
              <input
                placeholder="Email"
                {...register("email", { required: "Please provide an email" })}
              />
              {errors.email && (
                <FieldValueError errorMessage={`${errors.email.message}`} />
              )}
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField>
              <input
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
              {errors.password && (
                <FieldValueError errorMessage={`${errors.password.message}`} />
              )}
            </FormField>

            <FormField>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please provide a password",
                  minLength: {
                    value: 4,
                    message: "Password must have at least 4 characters",
                  },
                  validate: (value) =>
                    value === getValues("password") || "Password must match",
                })}
              />
              {errors.confirmPassword && (
                <FieldValueError
                  errorMessage={`${errors.confirmPassword.message}`}
                />
              )}
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField>
              <input
                placeholder="City"
                {...register("city", { required: "Please provide a city" })}
              />
              {errors.city && (
                <FieldValueError errorMessage={`${errors.city.message}`} />
              )}
            </FormField>

            <FormField>
              <input
                placeholder="Street"
                {...register("street", { required: "Please provide a street" })}
              />
              {errors.street && (
                <FieldValueError errorMessage={`${errors.street.message}`} />
              )}
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField>
              <input
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Please provide a phone number",
                })}
              />
              {errors.phoneNumber && (
                <FieldValueError
                  errorMessage={`${errors.phoneNumber.message}`}
                />
              )}
            </FormField>

            <Controller
              name="gender"
              control={control}
              rules={{ required: "Please provide a value" }}
              render={({ field: { onChange, value } }) => (
                <Form.Select
                  options={options}
                  placeholder="Gender"
                  onChange={(_e, { value }) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.gender && (
              <FieldValueError errorMessage={`${errors.gender.message}`} />
            )}
          </FormGroup>

          <FormGroup widths="equal">
            <FormField>
              <input
                placeholder="Youngest Child Age"
                {...register("minKidAge", {
                  required: "Please provide a value",
                })}
              />
              {errors.minKidAge && (
                <FieldValueError errorMessage={`${errors.minKidAge.message}`} />
              )}
            </FormField>

            <FormField>
              <input
                placeholder="Eldest Child Age"
                {...register("maxKidAge", {
                  required: "Please provide a value",
                })}
              />
              {errors.maxKidAge && (
                <FieldValueError errorMessage={`${errors.maxKidAge.message}`} />
              )}
            </FormField>

            <FormField>
              <input
                placeholder="Total number of kids"
                {...register("numOfKids", {
                  required: "Please provide a value",
                })}
              />
              {errors.numOfKids && (
                <FieldValueError errorMessage={`${errors.numOfKids.message}`} />
              )}
            </FormField>
          </FormGroup>
          <FormField>
            <textarea
              placeholder="Tell us more about you or the children"
              {...register("comments")}
            />
          </FormField>

          <FormGroup className={styles.checkbox}>
            <Controller
              control={control}
              name="termsAndConditions"
              render={({ field: { onChange, value } }) => (
                <FormCheckbox
                  label="I agree to the Terms and Conditions"
                  className={styles.checkbox}
                  onChange={() =>
                    onChange(setCheckedCheckbox(() => !checkedCheckbox))
                  }
                  value={value}
                />
              )}
            />
            {checkedCheckbox === false && (
              <FieldValueError
                errorMessage={
                  "Please agree to the Terms and Conditions to proceed"
                }
              />
            )}
          </FormGroup>

          <FormGroup>
            <FormButton
              size="large"
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Submit
            </FormButton>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default SignupParents;
