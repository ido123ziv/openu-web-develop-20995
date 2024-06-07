import {
  FormGroup,
  FormButton,
  Form,
  FormCheckbox,
  FormField,
  Modal,
} from "semantic-ui-react";
import { RiParentFill } from "react-icons/ri";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./SignupParents.module.css";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import FieldValueError from "../../../ui/FieldValueError/FieldValueError";
import { parentSignup } from "./parentSignupService";
import TermsAndConditions from "../../TermsAndConditions/TermsAndConditions";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["parentSignup"],
    mutationFn: parentSignup,
    onSuccess: async () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      reset();
    },
  });

  const onSubmit = (data: FieldValues) => {
    if (!checkedCheckbox) {
      return;
    }

    mutate(data);
  };

  return (
    <>
      <BackgroundSVG />

      <div className={styles.formContainer}>
        <RiParentFill size="5vh" className={styles.icon} />
        <h1 className={styles.h1}>Parent Sign Up</h1>
        <Form
          size="large"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <FormGroup widths="equal">
            <FormField className={styles.formField}>
              <label>Full Name</label>
              <input
                placeholder="Full Name"
                {...register("name", { required: "Please provide a name" })}
              />
              <div className={styles.error}>
                {errors?.name && (
                  <FieldValueError errorMessage={`${errors.name.message}`} />
                )}
              </div>
            </FormField>

            <FormField className={styles.formField}>
              <label>Email</label>
              <input
                placeholder="Email"
                {...register("email", { required: "Please provide an email" })}
              />
              <div className={styles.error}>
                {errors.email && (
                  <FieldValueError errorMessage={`${errors.email.message}`} />
                )}
              </div>
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField className={styles.formField}>
              <label>Password</label>
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
              <div className={styles.error}>
                {errors.password && (
                  <FieldValueError
                    errorMessage={`${errors.password.message}`}
                  />
                )}
              </div>
            </FormField>

            <FormField className={styles.formField}>
              <label>Confirm Password</label>
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
              <div className={styles.error}>
                {errors.confirmPassword && (
                  <FieldValueError
                    errorMessage={`${errors.confirmPassword.message}`}
                  />
                )}
              </div>
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField className={styles.formField}>
              <label>City</label>
              <input
                placeholder="City"
                {...register("city", { required: "Please provide a city" })}
              />
              <div className={styles.error}>
                {errors.city && (
                  <FieldValueError errorMessage={`${errors.city.message}`} />
                )}
              </div>
            </FormField>

            <FormField className={styles.formField}>
              <label>Street</label>
              <input
                placeholder="Street"
                {...register("street", { required: "Please provide a street" })}
              />
              <div className={styles.error}>
                {errors.street && (
                  <FieldValueError errorMessage={`${errors.street.message}`} />
                )}
              </div>
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField className={styles.formField}>
              <label>Phone Number</label>
              <input
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Please provide a phone number",
                })}
              />
              <div className={styles.error}>
                {errors.phoneNumber && (
                  <FieldValueError
                    errorMessage={`${errors.phoneNumber.message}`}
                  />
                )}
              </div>
            </FormField>

            <FormField className={styles.formField}>
              <label>Gender</label>
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
              <div className={styles.error}>
                {errors.gender && (
                  <FieldValueError errorMessage={`${errors.gender.message}`} />
                )}
              </div>
            </FormField>
          </FormGroup>

          <FormGroup widths="equal">
            <FormField className={styles.formField}>
              <label>Youngest Child Age</label>
              <input
                placeholder="Youngest Child Age"
                {...register("minKidAge", {
                  required: "Please provide a value",
                })}
              />
              <div className={styles.error}>
                {errors.minKidAge && (
                  <FieldValueError
                    errorMessage={`${errors.minKidAge.message}`}
                  />
                )}
              </div>
            </FormField>

            <FormField className={styles.formField}>
              <label>Eldest Child Age</label>

              <input
                placeholder="Eldest Child Age"
                {...register("maxKidAge", {
                  required: "Please provide a value",
                })}
              />
              <div className={styles.error}>
                {errors.maxKidAge && (
                  <FieldValueError
                    errorMessage={`${errors.maxKidAge.message}`}
                  />
                )}
              </div>
            </FormField>

            <FormField className={styles.formField}>
              <label>Total Number Of Kids</label>
              <input
                placeholder="Total number of kids"
                {...register("numOfKids", {
                  required: "Please provide a value",
                })}
              />
              <div className={styles.error}>
                {errors.numOfKids && (
                  <FieldValueError
                    errorMessage={`${errors.numOfKids.message}`}
                  />
                )}
              </div>
            </FormField>
          </FormGroup>
          <FormField>
            <label>Comments</label>

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
            <div className={styles.checkBoxError}>
              {checkedCheckbox === false && (
                <FieldValueError
                  errorMessage={
                    "Please agree to the Terms and Conditions to proceed"
                  }
                />
              )}
            </div>
          </FormGroup>

          <Link
            to="#"
            className={styles.terms}
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            Click here to see terms and conditions
          </Link>

          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            dimmer="inverted"
            closeIcon={{
              style: { top: "1.0535rem", right: "1rem" },
              color: "black",
              name: "close",
            }}
          >
            <TermsAndConditions />
          </Modal>

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
