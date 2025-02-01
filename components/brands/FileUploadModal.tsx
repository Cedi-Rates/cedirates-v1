import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { UploadIcon, ImageIcon, XIcon } from "../../assets/Icons";

interface Props {
  open: boolean;
  handleClose: (open: boolean) => void;
  handleUpload: (file: File | null) => void;
}

const ImageUpload: React.FC<Props> = ({ open, handleClose, handleUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { files: droppedFiles } = event.dataTransfer;
    handleFiles(droppedFiles);
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const selectedFile = fileList[0];

    if (!selectedFile) {
      return; // No file selected
    }

    if (selectedFile.type !== "image/jpeg" && selectedFile.type !== "image/png") {
      alert("Only JPEG and PNG files are allowed.");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      alert("File size should be less than 5MB.");
      return;
    }

    setFile(selectedFile);
    handleUpload(selectedFile);
    setUploadProgress(0); // Reset upload progress for new file
  };

  const handleImageAttachments = () => {
    if (file) {
      handleUpload(file);
    }
    handleClose(false);
  };

  const removeImage = () => {
    setFile(null);
    handleUpload(null); // Call the function passed down from the Review component
  };

  useEffect(() => {
    if (uploadProgress < 100) {
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => prevProgress + 10);
      }, 200);

      return () => {
        clearInterval(interval);
      };
    }
  }, [uploadProgress]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    handleFiles(fileList);
    if (event.target) {
      event.target.value = ""; // Reset the input value to allow selecting the same file again
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const shortenFileName = (name: string) => {
    const maxLength = 10; // Maximum length for the shortened name
    const extension = name.split(".").pop(); // Get the file extension

    if (name.length > maxLength) {
      const shortenedName = name.substr(0, maxLength);
      return `${shortenedName}...${extension}`;
    }

    return name;
  };

  return (
    <>
      <div className="iconTextAreaButton" onClick={openFileDialog}>
        <ImageIcon />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImageUpload;
