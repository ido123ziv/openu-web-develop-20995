import {
  Button,
  Form,
  FormButton,
  FormField,
  FormGroup,
  Header,
  Icon,
  Image,
} from "semantic-ui-react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useMemo } from "react";

import styles from "./BabysitterProfile.module.css";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import { userState } from "../../../state/atoms/userAtom";
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "./babysitterProfileServices";
import { updatedValues } from "../helpers/helpers";
import { BabysitterData } from "./BabysitterProfileInterfaces";
import UploadButton from "../UploadButton/UploadButton";

const experience = [
  { key: 0, text: "No Experience", value: "no_experience" },
  { key: 1, text: "1-3", value: "mid" },
  { key: 2, text: "3+", value: "high" },
];

const BabysitterProfile = () => {
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(user.id),
    onError: (error) => console.log(error),
  });

  const defaultFormValues = useMemo(
    () => ({
      name: userData?.name || "",
      city: userData?.city || "",
      street: userData?.street || "",
      phoneNumber: userData?.phoneNumber || "",
      experience: userData?.experience || "",
      comments: userData?.comments || "",
    }),
    [userData]
  );

  const onSubmit = async (data: FieldValues) => {
    const updatedProfile = updatedValues(data);
    if (!updatedProfile) {
      return;
    }

    mutate(updatedProfile as BabysitterData);
  };

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: BabysitterData) => updateProfile(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["getProfile"]);
      reset();
    },
    onError: (error) => console.log(error),
  });

  const { mutate: deleteUser } = useMutation({
    mutationKey: ["deleteProfile"],
    mutationFn: async () => {
      const result = await Swal.fire({
        title: "Are you sure you want to delete your profile?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isDismissed) {
        return;
      }

      resetUser();
      await deleteProfile(user.id);
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    reset(defaultFormValues);
  }, [userData, reset, defaultFormValues]);

  const handleDelete = () => {
    deleteUser();
  };

  return (
    <>
      <BackgroundSVG />

      <div className={styles.borderedDiv}>
        <div className={styles.iconContainer}>
          <Header as="h2" icon textAlign="center">
            <Icon name="address card outline" circular />
            <Header.Content>Your profile</Header.Content>
          </Header>
        </div>

        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={userData?.imageString || "/babysitter.svg"}
              size="medium"
              rounded
            />
            <UploadButton />
          </div>

          <div className={styles.dataContainer}>
            <Form size="big" widths="equal" onSubmit={handleSubmit(onSubmit)}>
              <h1>{userData?.name}</h1>
              <div className={styles.formContentContainer}>
                <div className={styles.leftContainer}>
                  <FormGroup>
                    <FormField>
                      <label>Full Name</label>
                      <input {...register("name")} />
                    </FormField>

                    <FormField>
                      <label>Email</label>
                      <input value={userData?.email} readOnly />
                    </FormField>
                  </FormGroup>

                  <FormGroup>
                    <FormField>
                      <label>City</label>
                      <input {...register("city")} />
                    </FormField>

                    <FormField>
                      <label>Street</label>
                      <input {...register("street")} />
                    </FormField>
                  </FormGroup>

                  <FormField>
                    <label>Phone Number</label>
                    <input {...register("phoneNumber")} />
                  </FormField>
                  <FormField>
                    <label>Experience</label>
                    <Controller
                      name="experience"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Select
                          options={experience}
                          placeholder={
                            userData?.experience &&
                            experience.find(
                              (el) => el.value === userData.experience
                            )?.text
                          }
                          onChange={(_e, { value }) => onChange(value)}
                          value={value}
                        />
                      )}
                    />
                  </FormField>
                </div>

                <FormField className={styles.commentsField}>
                  <label>Comments</label>
                  <textarea {...register("comments")} />
                </FormField>
              </div>

              <div className={styles.submitContainer}>
                <FormButton
                  primary
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.saveBtn}
                  size="large"
                >
                  Save Changes
                </FormButton>
              </div>
            </Form>
          </div>

          <div className={styles.delete}>
            <Button
              color="red"
              className={styles.deleteBtn}
              onClick={handleDelete}
            >
              Delete Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BabysitterProfile;
