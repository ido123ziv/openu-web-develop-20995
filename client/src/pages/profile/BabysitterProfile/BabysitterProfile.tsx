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
import { Controller, FieldValues, useForm } from "react-hook-form";

import styles from "./BabysitterProfile.module.css";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import { userState } from "../../../state/atoms/userAtom";
import { getProfile, updateProfile } from "./babysitterProfileServices";
import { updatedValues } from "../helpers/helpers";
import { BabysitterData } from "./BabysitterProfileInterfaces";

const experience = [
  { key: 0, text: "No Experience", value: "no_experience" },
  { key: 1, text: "1-3", value: "mid" },
  { key: 2, text: "3+", value: "high" },
];

const BabysitterProfile = () => {
  const {
    register,
    handleSubmit,
    control,
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
    mutationFn: (data: BabysitterData) => updateProfile(user.id, data),
    onSuccess: () => queryClient.invalidateQueries(["getProfile"]),
    onError: (error) => console.log(error),
  });

  const onSubmit = async (data: FieldValues) => {
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

export default BabysitterProfile;
