import React from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = () => {
  const onDrop = (acceptedFiles) => {
    // Do something with the files, like upload to a server
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
    </div>
  );
};

export default MyDropzone;
