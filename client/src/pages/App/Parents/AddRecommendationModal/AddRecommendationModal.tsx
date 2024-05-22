import {
  Button,
  Form,
  FormField,
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  Rating,
} from "semantic-ui-react";
import { useMutation } from "react-query";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

import { ModalAddReviewProps } from "./RecommendationModalInterfaces";
import { addRecommendation } from "./recommendationServices";

const AddRecommendationModal = ({
  isOpen,
  setIsOpen,
  parentId,
  babysitterId,
  babysitterName,
}: ModalAddReviewProps) => {
  const [rating, setRating] = useState<number>(-1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const { mutate } = useMutation({
    mutationKey: ["addRecommendation"],
    mutationFn: addRecommendation,
    onSuccess: () => {
      Swal.fire({
        title: "Your review has been submitted",
        icon: "success",
      });
    },
    onError: (error: unknown) => {
      reset();
      console.log(error);
    },
  });

  const onSubmit = async (data: FieldValues): Promise<void> => {
    if (rating < 0) {
      return;
    }
    mutate({ data, babysitterId, parentId, rating });
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
              <Rating
                size="massive"
                icon="star"
                defaultRating={0}
                maxRating={5}
                onRate={(_event, data) => {
                  setRating(Number(data.rating));
                }}
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
