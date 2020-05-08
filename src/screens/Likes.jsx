import React, { useState, useEffect } from "react";
import styles from "./Likes.module.css";
import Card from "../components/Card";
import { fetchAllLikes } from "../utils/request";
import Loader from "../components/Loader";

const Likes = (props) => {
  const [labs, setLabs] = useState([]);
  useEffect(() => {
    const onMount = async () => {
      const res = await fetchAllLikes();
      setLabs(res);
    };
    onMount();
  }, []);

  if (!labs) return <Loader />;
  return (
    <div className={styles.content}>
      {labs.map((lab) => (
        <div
          key={lab.id}
          onClick={() => props.history.push(`/profile/${lab.id}`)}
        >
          <Card
            outline
            name={lab.name}
            imgUrl={lab.profile_image}
            technologies={lab.technologies}
          ></Card>
        </div>
      ))}
    </div>
  );
};

export default Likes;
