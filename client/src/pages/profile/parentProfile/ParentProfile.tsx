import {
  Button,
  Form,
  FormButton,
  FormField,
  FormGroup,
  Icon,
  Image,
} from "semantic-ui-react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

import { userState } from "../../../state/atoms/userAtom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import styles from "./parentProfile.module.css";
import { ParentData } from "./parentProfileInterfaces";
import { updatedValues } from "../helpers/helpers";
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "./parentProfileServices";

const ParentProfile = () => {
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const updatedProfile = updatedValues(data);
    if (!updatedProfile) {
      return;
    }

    mutate(updatedProfile as ParentData);
  };

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
      minKidAge: userData?.minKidAge || "",
      maxKidAge: userData?.maxKidAge || "",
      numOfKids: userData?.numOfKids || "",
      comments: userData?.comments || "",
    }),
    [userData]
  );

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: ParentData) => updateProfile(user.id, data),
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
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: defaultFormValues });

  useEffect(() => {
    reset(defaultFormValues);
  }, [userData, reset, defaultFormValues]);

  const handleDelete = () => {
    deleteUser();
  };

  return (
    <>
      <BackgroundSVG />

      <div className={styles.iconContainer}>
        <Icon
          name="address card outline"
          size="massive"
          className={styles.icon}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            size="medium"
            rounded
          />
          <Button primary className={styles.uploadImageBtn}>
            Upload a picture
          </Button>
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
              </div>

              <FormField className={styles.commentsField}>
                <label>Comments</label>
                <textarea {...register("comments")} />
              </FormField>
            </div>
            <FormGroup className={styles.kidsContainer}>
              <FormField>
                <label>Youngest Child Age</label>
                <input {...register("minKidAge")} />
              </FormField>

              <FormField>
                <label>Eldest Child Age</label>
                <input {...register("maxKidAge")} />
              </FormField>

              <FormField>
                <label>Total Number of Kids</label>
                <input {...register("minKidAge")} />
              </FormField>
            </FormGroup>

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

export default ParentProfile;
