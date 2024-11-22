import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./css/image.module.css";

const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.master}>
      <div>
        <img className={styles.logo} src="/asset/1.png" alt="Logo" />
        <button onClick={handleClick} className={styles.button}>
          他の猫
        </button>
        <div>{loading || <img src={imageUrl} className={styles.image} />}</div>
      </div>
    </div>
  );
};

export default IndexPage;

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  if (!Array.isArray(images)) {
    throw new Error("猫の画像が取得できませんでした。");
  }
  console.log(images);
  return images[0];
};
