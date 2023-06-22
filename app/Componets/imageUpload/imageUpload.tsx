import { useState } from "react";
import dotenv from "dotenv";
import styles from "./imageUpload.module.scss";

dotenv.config();

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        // Restricción de tamaño a 2MB
        try {
          const formData = new FormData();
          formData.append("file", file);

          formData.append("upload_preset", "bidwiz"); // Reemplaza con tu upload preset de Cloudinary

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (response.ok) {
          } else {
          }

          const data = await response.json();
          setImage(data.secure_url);
          onImageUpload(data.secure_url);
        } catch (error) {}
      }
    }
  };

  return (
    <div>
      <div className={styles.label}>
        <label>Select Avatar</label>
      </div>
      <input
        type="file"
        accept="image/*"
        className={styles.button}
        onChange={handleImageChange}
      />
      {image && <img src={image} alt="Uploaded" width="200px" />}{" "}
    </div>
  );
};

export default ImageUpload;
