import { useRef } from "react";
import { Button } from "semantic-ui-react";

import styles from "./UploadButton.module.css";

const UploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     onUpload(file);
  //   }
  //   };

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
        // onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadButton;
