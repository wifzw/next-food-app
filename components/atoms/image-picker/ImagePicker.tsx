"use client";

import React, { MutableRefObject, useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export interface IImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: IImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<null | string>(
    null
  );
  const imageInput: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    imageInput?.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result as string
      setPickedImage(result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          required
          ref={imageInput}
          onChange={handleImageChange}
        />
        
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
