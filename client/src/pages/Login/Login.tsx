import { useNavigate } from "react-router-dom";
import { Form, FormButton, FormField, FormGroup } from "semantic-ui-react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import { userLogin } from "./loginService";
import { userState } from "../../state/atoms/userAtom";
import FieldValueError from "../../ui/FieldValueError/FieldValueError";
import BackgroundSVG from "../../ui/BackgroundSVG/BackgroundSVG";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: userLogin,
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      setUser(data);
      navigate(`/app/${data.role}`);
    },
    onError: () => {
      reset();
      setWrongCredentials(true);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    mutate(data);
  };

  return (
    <>
      <BackgroundSVG />

      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Login</h1>

        <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup>
            <FormField className={styles.inputField}>
              <input
                placeholder="Email"
                {...register("email", {
                  required: "please provide an email",
                })}
              />
            </FormField>
          </FormGroup>

          <FormGroup>
            <FormField className={styles.inputField}>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Please provide a password",
                  minLength: {
                    value: 4,
                    message: "password must have at least 4 characters",
                  },
                })}
              />
            </FormField>
          </FormGroup>

          <ul className={styles.errorsContainer}>
            {errors.email && (
              <FieldValueError errorMessage={`${errors.email.message}`} />
            )}
            {errors.password && (
              <FieldValueError errorMessage={`${errors.password.message}`} />
            )}
            {wrongCredentials && (
              <FieldValueError errorMessage="Incorrect email or password" />
            )}
          </ul>

          <FormButton
            size="large"
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            Submit
          </FormButton>
        </Form>
        <Link to="/signup" className={styles.signupBtn}>
          Sign up now
        </Link>
      </div>
    </>
  );
};

export default Login;
