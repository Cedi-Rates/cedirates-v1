import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
// import "./fileupload.css";
// import { useSelector } from "react-redux";
import styles from "../../assets/styles/listing.module.css";
import CompanyDetails from "./company-details";
import {
  CompanyDetailsInterface,
  useGeneralDetails,
} from "@/context/context-provider";
import Image from "next/image";

// interface FileUploadProps {
//   setImageUrl: React.Dispatch<React.SetStateAction<File | null>>;
// }

interface FileUploadProps {
  setImageUrl: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setImageUrl }) => {
  const { companyDetails } = useGeneralDetails();
  const defaultImage: any = companyDetails?.image || null;

  const [displayImage, setDisplayImage] = useState<string>("");

  // const [imageDimensions, setImageDimensions] = useState<{
  //   width: number;
  //   height: number;
  // } | null>(null);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = displayImage;
  //   img.onload = () => {
  //     setImageDimensions({ width: img.width, height: img.height });
  //   };
  // }, [displayImage]);

  useEffect(() => {
    if (defaultImage instanceof File) {
      setDisplayImage(URL.createObjectURL(defaultImage));
    }
  }, [defaultImage]);
  const [imageName, setImageName] = useState<string | null>(null);

  useEffect(() => {
    if (companyDetails?.image instanceof File) {
      setImageName(companyDetails?.image?.name || null);
    }
  }, [companyDetails]);
  const [showInfoBar, setShowInfoBar] = useState<boolean>(false);

  const handleUpload = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files && files.length > 0 ? files[0] : null;
    if (file) {
      setImageUrl(file);
      setDisplayImage(URL.createObjectURL(file));
      setImageName(file.name);
      setShowInfoBar(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files && files.length > 0 ? files[0] : null;
    if (file) {
      setImageUrl(file);
      setDisplayImage(URL.createObjectURL(file));
      setImageName(file.name);
      setShowInfoBar(true);
    }
  };
  const removeImage = () => {
    setDisplayImage("");
    setImageName(null);
    setShowInfoBar(false);
  };

  return (
    <div>
      <form
        className={styles["file-upload"]}
        onClick={() =>
          document.querySelector<HTMLInputElement>(".input-field")?.click()
        }
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {displayImage ? (
          <Image
            src={displayImage}
            alt="logo"
            className={styles.img}
            width={60}
            height={60}
          />
        ) : (
          <>
            <input
              type="file"
              accept="image/jpg, image/png, image/svg"
              // className={styles["input-field"]}
              className="input-field"
              onChange={handleUpload}
              hidden
            />
            <div className={"flex flex-col place-items-center "}>
              <figure>
                <LuUpload size={18} />
              </figure>

              <p className="text-md flex flex-col items-center">
                Drag and drop company logo or <br />
                <span className="text-[#1896fe]">Browse files</span>
              </p>
              <p className="text-black/60">svg, jpg and png only</p>
            </div>
          </>
        )}
      </form>
      <div
        className={styles["image-info"]}
        style={{ display: showInfoBar || imageName ? "flex" : "none" }}
      >
        <p className={styles["image-info-paragraph"]}>{imageName}</p>
        <FaTrash onClick={removeImage} />
      </div>
    </div>
  );
};

export default FileUpload;
