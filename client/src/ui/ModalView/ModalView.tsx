import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
} from "semantic-ui-react";
import { LiaBirthdayCakeSolid, LiaCommentsSolid } from "react-icons/lia";
import { FaChild, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineChildCare } from "react-icons/md";
import { FaChildren } from "react-icons/fa6";
import { GiRank1, GiRank2, GiRank3 } from "react-icons/gi";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";

import styles from "./ModalView.module.css";
import { ModalViewProps } from "./ModalViewInterface";
import { userState } from "../../state/atoms/userAtom";
import AddRecommendationModal from "../../pages/App/Parents/AddRecommendationModal/AddRecommendationModal";
import {
  approveUser,
  getBabysitterRecommendations,
  getInteraction,
  updateContacted,
  updateLastVisited,
  updateWorkedWith,
} from "./modalViewServices";
import RecommendationCards from "../../pages/App/Babysitter/RecommendationCards/RecommendationCards";

const ModalView = ({ isOpen, setIsOpen, card, screen }: ModalViewProps) => {
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);
  const [showWorkedWithMessage, setShowWorkedWithMessage] =
    useState<boolean>(false);
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const handleAddReview = () => {
    setIsOpenReviewModal(true);
  };

  const { data: interaction } = useQuery({
    queryKey: ["getInteraction"],
    queryFn: () => {
      if (user.role === "parents") {
        return getInteraction(user.id, card?.id as number);
      }
    },
    onSuccess: (interaction) => {
      if (!interaction) {
        handleUpdateLastVisit();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateLastVisited } = useMutation({
    mutationKey: ["updateLastVisit"],
    mutationFn: () => {
      if (user.role !== "parents") {
        return Promise.resolve();
      }

      return updateLastVisited(user.id, card?.id as number);
    },
    onSuccess: () =>
      queryClient.invalidateQueries([
        "getInteraction",
        user.id,
        card?.id as number,
      ]),
    onError: (error) => console.log(error),
  });

  const handleUpdateLastVisit = () => {
    mutateLastVisited();
  };

  const { mutate: mutateContacted } = useMutation({
    mutationKey: ["updateLastVisit"],
    mutationFn: () => updateContacted(user.id, card?.id as number),
    onSuccess: () => {
      queryClient.invalidateQueries(["getInteraction"]);
    },
    onError: (error) => console.log(error),
  });

  const handleContacted = () => {
    mutateContacted();
  };

  const { mutate: mutateWorkedWith } = useMutation({
    mutationKey: ["updateLastVisit"],
    mutationFn: () => updateWorkedWith(user.id, card?.id as number),
    onSuccess: () => {
      queryClient.invalidateQueries(["getInteraction"]);
    },
  });

  const { data: recommendations } = useQuery({
    queryKey: ["babysitterRecommendations"],
    queryFn: () => {
      console.log(card?.role);
      if (card?.role === "babysitter") {
        return getBabysitterRecommendations(card?.id as number);
      }

      return Promise.resolve([]);
    },
    enabled: true,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleWorkedWith = () => {
    mutateWorkedWith();
  };

  const { mutate: mutateApprove } = useMutation({
    mutationKey: ["approveUser"],
    mutationFn: () => {
      return approveUser(card?.role as string, card?.id as number);
    },
    onSuccess: () => queryClient.invalidateQueries(["getAllPendingUsers"]),
    onError: (error) => console.log(error),
  });

  const handleActivate = () => {
    mutateApprove();
    setIsOpen(false);
  };

  const handleAddReviewClick = () => {
    if (interaction?.workedWith) {
      handleAddReview();
    } else {
      setShowWorkedWithMessage(true);
    }
  };

  useEffect(() => {
    if (showWorkedWithMessage) {
      Swal.fire({
        title: "Please click 'Worked with' before adding a review",
        icon: "info",
      }).then(() => setShowWorkedWithMessage(false));
    }
  }, [showWorkedWithMessage]);

  return (
    <Modal
      closeIcon
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      size="large"
    >
      <ModalHeader>{card?.name}</ModalHeader>
      <ModalContent image>
        <Image
          size="medium"
          src={
            card?.imageString
              ? card.imageString
              : card?.role === "parent"
              ? "/baby.svg"
              : "/babysitter.svg"
          }
          wrapped
          className={styles.image}
        />
        <ModalDescription>
          <Header>{card?.name}</Header>

          <div className={styles.content}>
            <div className={styles.infoContainer}>
              <div className={styles.infoColumn}>
                <p>
                  <Icon
                    name={card?.gender === "F" ? "female" : "male"}
                    className={styles.icon}
                  />
                  {card?.gender === "F" ? "Female" : "Male"}
                </p>

                <p>
                  <Icon name="mail outline" className={styles.icon} />
                  {card?.email}
                </p>

                <p>
                  <Icon name="phone" className={styles.icon} />
                  {card?.phoneNumber}
                </p>

                <p>
                  <Icon name="star" className={styles.icon} />
                  Rating: {card?.rating || "N/A"}
                </p>
              </div>

              <div className={styles.infoColumn}>
                {card?.role === "parent" ? (
                  <>
                    <p>
                      <MdOutlineChildCare className={styles.icon} />
                      Youngest Child Age: {card.minKidAge}
                    </p>

                    <p>
                      <FaChild className={styles.icon} />
                      Eldest Child Age: {card.maxKidAge}
                    </p>

                    <p>
                      <FaChildren className={styles.icon} />
                      Total Number of Kids: {card.numOfKids}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <LiaBirthdayCakeSolid className={styles.icon} />
                      Age: {card?.age}
                    </p>

                    <p>
                      <FaMapMarkerAlt className={styles.icon} />
                      {card?.street}, {card?.city}
                    </p>

                    {card?.experience === "no_experience" && (
                      <p>
                        <GiRank1 className={styles.icon} />
                        Experience: No Experience
                      </p>
                    )}

                    {card?.experience === "mid" && (
                      <p>
                        <GiRank2 className={styles.icon} />
                        Experience: 1-3 Years
                      </p>
                    )}

                    {card?.experience === "high" && (
                      <p>
                        <GiRank3 className={styles.icon} />
                        Experience: 3+ years
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <p>
              <LiaCommentsSolid className={styles.icon} />
              {card?.comments}
            </p>
          </div>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        {user.role === "parents" && (
          <>
            <Button
              onClick={() => {
                if (!card?.didParentRate) {
                  handleAddReviewClick();
                }
              }}
              positive={card?.didParentRate === 1}
            >
              {card?.didParentRate ? "Rated" : "Add a review"}
            </Button>
            <Button
              content="Contacted"
              labelPosition="right"
              icon={interaction?.contacted ? "checkmark" : "question"}
              onClick={handleContacted}
              positive={interaction?.contacted}
            />
            <Button
              content="Worked with"
              labelPosition="right"
              icon={interaction?.workedWith ? "checkmark" : "question"}
              onClick={handleWorkedWith}
              positive={interaction?.workedWith}
            />
          </>
        )}

        {screen === "pending" && (
          <>
            <Button
              content="Activate"
              positive
              onClick={() => handleActivate()}
            />
            <Button
              content="Decline"
              negative
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </ModalActions>

      <div className={styles.recommendations}>
        {(user.role === "parents" || user.role === "moderator") &&
          recommendations?.length > 0 && (
            <RecommendationCards data={recommendations} />
          )}
      </div>

      {isOpenReviewModal && (
        <AddRecommendationModal
          isOpen={isOpenReviewModal}
          setIsOpen={setIsOpenReviewModal}
          parentId={user.id}
          babysitterId={card?.id}
          babysitterName={card?.name}
        />
      )}
    </Modal>
  );
};

export default ModalView;
