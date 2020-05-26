import React, { useEffect } from "react";
import styles from "./Likes.module.css";

import { fetchLikes, getMatches } from "../utils/request";
import { useState } from "react";
import Loader from "../components/Loader";
import Swiper from "../components/Swiper";
import Match from "../components/Match";

const Likes = () => {
  const [likes, setLikes] = useState(null);
  const [match, isMatch] = useState(null);

  useEffect(() => {
    const onMount = async () => {
      const likes = await fetchLikes();
      console.log(likes);
      setLikes(likes);
      const matched = await getMatches();
      isMatch(matched);
    };
    onMount();
  }, []);

  const removeLike = () => {
    const newLikes = [...likes];
    newLikes.pop();
    setLikes(newLikes);
  };

  if (!likes) return <Loader></Loader>;

  return (
    <div className={styles.content}>
      <Swiper items={likes} callback={removeLike}></Swiper>
      {!!match && <Match match={match.lab} />}
    </div>
  );
};

export default Likes;
