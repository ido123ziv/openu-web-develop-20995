import { useNavigate } from "react-router-dom";
import { Form, FormButton, FormField, FormGroup } from "semantic-ui-react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const { mutate } = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: userLogin,
    onSuccess: async (data) => {
      if (!data) {
        return;
      }

      setUser(data);
      navigate(`/app/${user.role}`);
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
          <FormGroup className={styles.inputGroup}>
            <FormField>
              <input
                placeholder="Email"
                {...register("email", {
                  required: "please provide an email",
                })}
              />
            </FormField>
          </FormGroup>
          <FormGroup className={styles.inputGroup}>
            <FormField>
              <input
                type="password"
                placeholder="password"
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
          <FormGroup>
            <ul>
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
          </FormGroup>
          <FormGroup className={styles.submitContainer}>
            <FormButton type="submit" primary disabled={isSubmitting}>
              Submit
            </FormButton>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default Login;
