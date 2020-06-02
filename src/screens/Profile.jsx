import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Tags from "../components/Tags";
import Card from "../components/Card";
import { fetchProfile, fetchLikes, like, dislike } from "../utils/request";
import Loader from "../components/Loader";
import GoBack from "../components/GoBack";
import Match from "../components/Match";

const Profile = (props) => {
  const [profile, setProfile] = useState(null);
  const [likes, setLikes] = useState(null);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const onMount = async () => {
      const id = props.match.params.id;
      const profile = await fetchProfile(id);
      // 1. fetchLikes and setLikes
      const likes = await fetchLikes();

      setLikes(likes);
      setProfile(profile);
    };
    onMount();
  }, [props.match.params.id]);

  const removeLike = () => {
    // 5. Find like index and splice it from state
    const newLikes = [...likes];
    const index = newLikes.findIndex((like) => like.id === profile.id);
    newLikes.splice(index, 1);
    setLikes(newLikes);
  };

  const onButtonClick = async (direction) => {
    // 4. removeLike from state
    // 6. likeOrDislike
    const res =
      direction === "right"
        ? await like(profile.id)
        : await dislike(profile.id);

    if (res.match) {
      const index = likes.findIndex((like) => like.id === profile.id);
      const match = { ...likes[index] };
      setMatch(match);
    }

    removeLike();
  };

  const _renderButtons = () => {
    return (
      <div className={styles.buttons}>
        <div className={styles.button} onClick={() => onButtonClick("left")}>
          <img src={require("../static/svg/close.svg")} alt={"close"} />
        </div>
        <div className={styles.button} onClick={() => onButtonClick("right")}>
          <img src={require("../static/svg/heart.svg")} alt={"heart"} />
        </div>
      </div>
    );
  };

  const isLikeable = () => {
    // 3. likes.some
    return likes.some((like) => like.id === profile.id);
  };

  const onContinueSwiping = () => {
    setMatch(null);
  };

  if (!profile) return <Loader />;

  return (
    <>
      {match && (
        <Match match={match} onContinueSwiping={onContinueSwiping}></Match>
      )}
      <div className={styles.profile}>
        <GoBack />
        <div className={styles.hero}>
          <Card imgUrl={profile.profile_image}></Card>
          {isLikeable() && _renderButtons()}
        </div>
        <div className={styles.rightSide}>
          <h3 className={styles.name}>{profile.name}</h3>

          <section className={styles.skills}>
            <p className={styles.tagsTitle}>Technologies</p>
            {profile.technologies && <Tags tags={profile.technologies}></Tags>}
          </section>

          <section className={styles.objectives}>
            <h4 className={styles.heading}>Objectives</h4>
            <p>{profile.objectives}</p>
          </section>

          <section className={styles.description}>
            <h4 className={styles.heading}>About</h4>

            <p>{profile.description}</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
