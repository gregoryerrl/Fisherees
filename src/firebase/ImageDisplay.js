// src/ImageDisplay.js
import React, {useState, useEffect} from "react";
import {storage, ref, getDownloadURL} from "./firebaseConfig";

const ImageDisplay = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "data/photo.jpg");
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Image from Firebase Storage</h2>
    </div>
  );
};

export default ImageDisplay;
