import { useRef } from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { useRecoilValue } from "recoil";

import styles from "./UploadButton.module.css";
import { userState } from "../../../state/atoms/userAtom";
import { useMutation } from "react-query";

const UploadButton = () => {
  const user = useRecoilValue(userState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImage = async ({ file }: { file: File }) => {
    const formData = new FormData();
    formData.append("image", file);

    await axios.put(
      `http://localhost:3000/api/${user.role}/image/${user.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const { mutate } = useMutation(uploadImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutate({ file });
    }
  };

  return (
    <div>
      <Button
        primary
        className={styles.uploadImageBtn}
        onClick={handleButtonClick}
      >
        Upload a picture
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadButton;
