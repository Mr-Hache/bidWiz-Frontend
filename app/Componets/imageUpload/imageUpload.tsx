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
          console.log("todo correcto");
        } else {
          console.log("error");
        }

        const data = await response.json();
        setImage(data.secure_url);
        onImageUpload(data.secure_url);

        console.log(image);
        console.log(data);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className={styles.button}
        onChange={handleImageChange}
      />
      {image && <img src={image} alt="Uploaded" width="200px" />}{" "}
      {/* Mostrar la imagen cargada */}
    </div>
  );
};

export default ImageUpload;
