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
import { useState } from "react";

import styles from "./ModalView.module.css";
import { ModalViewProps } from "./ModalViewInterface";
import { userState } from "../../state/atoms/userAtom";
import AddRecommendationModal from "../../pages/App/Parents/AddRecommendationModal/AddRecommendationModal";

const ModalView = ({ isOpen, setIsOpen, card }: ModalViewProps) => {
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  const handleAddReview = () => {
    setIsOpenReviewModal(true);
  };

  return (
    <Modal
      closeIcon
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <ModalHeader>{card?.name}</ModalHeader>
      <ModalContent image>
        <Image
          size="medium"
          src={
            card?.imageString || card?.role === "parent"
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
            <Button color="black" onClick={handleAddReview}>
              Add a review
            </Button>
            <Button
              content="Worked with"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setIsOpen(false)}
              positive
            />
          </>
        )}
      </ModalActions>

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
