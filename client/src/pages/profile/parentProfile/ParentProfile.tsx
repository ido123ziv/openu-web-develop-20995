import {
  Button,
  Form,
  FormButton,
  FormField,
  FormGroup,
  Icon,
  Image,
} from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FieldValues, useForm } from "react-hook-form";

import { userState } from "../../../state/atoms/userAtom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import styles from "./parentProfile.module.css";
import { ParentData } from "./parentProfileInterfaces";
import { updatedValues } from "../helpers/helpers";
import { getProfile, updateProfile } from "./parentProfileServices";

const ParentProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(user.id),
    onError: (error) => console.log(error),
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: ParentData) => updateProfile(user.id, data),
    onSuccess: () => queryClient.invalidateQueries(["getProfile"]),
    onError: (error) => console.log(error),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    mutate(updatedValues(data));
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
                    <input placeholder={userData?.name} {...register("name")} />
                  </FormField>

                  <FormField>
                    <label>Email</label>
                    <input placeholder={userData?.email} readOnly />
                  </FormField>
                </FormGroup>

                <FormGroup>
                  <FormField>
                    <label>City</label>
                    <input placeholder={userData?.city} {...register("city")} />
                  </FormField>

                  <FormField>
                    <label>Street</label>
                    <input
                      placeholder={userData?.street}
                      {...register("street")}
                    />
                  </FormField>
                </FormGroup>

                <FormField>
                  <label>Phone Number</label>
                  <input
                    placeholder={userData?.phoneNumber}
                    {...register("phoneNumber")}
                  />
                </FormField>
                <FormGroup>
                  <FormField>
                    <label>Phone Number</label>
                    <input
                      placeholder={`${userData?.minKidAge}`}
                      {...register("minKidAge")}
                    />
                  </FormField>
                  <FormField>
                    <label>Eldest Child Age</label>
                    <input
                      placeholder={`${userData?.maxKidAge}`}
                      {...register("maxKidAge")}
                    />
                  </FormField>
                  <FormField>
                    <label>Phone Number</label>
                    <input
                      placeholder={`${userData?.numOfKids}`}
                      {...register("minKidAge")}
                    />
                  </FormField>
                </FormGroup>
              </div>

              <FormField className={styles.commentsField}>
                <label>Comments</label>
                <textarea
                  placeholder={userData?.comments}
                  {...register("comments")}
                />
              </FormField>
            </div>

            <FormButton
              primary
              type="submit"
              disabled={isSubmitting}
              className={styles.saveBtn}
            >
              Save Changes
            </FormButton>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ParentProfile;
