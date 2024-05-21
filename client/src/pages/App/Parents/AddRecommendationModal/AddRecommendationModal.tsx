import {
  Button,
  Form,
  FormField,
  Header,
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
} from "semantic-ui-react";
import { useMutation } from "react-query";
import { FieldValues, useForm } from "react-hook-form";

import { ModalAddReviewProps } from "./RecommendationModalInterfaces";
import { addRecommendation } from "./recommendationServices";

const AddRecommendationModal = ({
  isOpen,
  setIsOpen,
  parentId,
  babysitterId,
  babysitterName,
}: ModalAddReviewProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const { mutate } = useMutation({
    mutationKey: ["addRecommendation"],
    mutationFn: addRecommendation,
    onError: (error: unknown) => {
      reset();
      console.log(error);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    mutate({ data, babysitterId, parentId });
  };

  return (
    <Modal
      closeIcon
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <ModalHeader>{`Post a review about ${babysitterName}`}</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Header>{`Post a review about ${babysitterName}`}</Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <textarea
                placeholder="Add your review"
                {...register("recommendationText", {
                  required: "please provide an review",
                })}
              />
            </FormField>

            <FormField>
              <label>Rating</label>
              <input
                placeholder="on a scale of 1 to 5 (5 being the most awesome babysitter ever)"
                type="number"
                {...register("rating", {
                  required: "please provide a rating",
                  min: { value: 1, message: "Rating must be at least 1" },
                  max: { value: 5, message: "Rating cannot be more than 5" },
                })}
              />
            </FormField>

            <p>Are you sure you want to post this review?</p>

            <Button type="submit" secondary disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default AddRecommendationModal;
