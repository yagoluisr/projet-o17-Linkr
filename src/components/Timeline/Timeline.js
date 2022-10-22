import { useState, useEffect } from "react";
import { getUser, getPosts } from "../../services/api";
import PostsBox from "./PostsBox";
import styled from "styled-components";
import ProfilePic from "../../assets/styles/ProfilePic";
import Title from "../../assets/styles/Title";
import TimelineMessage from "../../assets/styles/TimelineMessage";
import FormBox from "./FormBox";

export default function Timeline() {
  const [userEmail, setUserEmail] = useState();
  const [userImage, setUserImage] = useState();
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setRefresh(false);
    const promise = getUser();
    getUser().then((user) => {
      setUserEmail(user.data.email);
      setUserImage(user.data.image_url);
    });
    promise.catch((error) => {
      console.log(error);
    });
    const request = getPosts();
    request.then((posts) => {
      setPosts(posts.data);
    });
    request.catch((error) => {
      console.log(error);
      alert(
        "There have been an issue fetching your timeline, please refresh the page"
      );
    });
  }, [refresh, setUserEmail]);
  return (
    <Wrapper>
      <Title>timeline</Title>
      <PublishBox>
        <ProfilePic src={userImage} />
        <FormBox
          refresh={refresh}
          setRefresh={setRefresh}
          updatePosts={setPosts}
        />
      </PublishBox>
      <Posts>
        {posts ? (
          <PostsBox
            refresh={refresh}
            setRefresh={setRefresh}
            userEmail={userEmail}
            posts={posts}
          />
        ) : (
          <TimelineMessage>Loading...</TimelineMessage>
        )}
      </Posts>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: fit-content;
  margin-top: 50px;
  width: 40vw;
  background-color: var(--background-gray);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h2 {
    font-size: 60px;
    text-align: left;
  }

  @media (max-width: 614px) {
    width: 100vw;
    margin-top: 30px;
    h2 {
      font-size: 40px;
      margin-left: 10px;
    }
  }
`;

const PublishBox = styled.div`
  margin-top: 60px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-white);
  height: fit-content;
  width: 40vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  img {
    display: none;
  }

  @media (max-width: 614px) {
    width: 100vw;
    margin-top: 35px;
    border-radius: 0px;
  }
`;

const Posts = styled.div`
  margin-top: 15px;
  height: fit-content;
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 614px) {
    width: 100vw;
  }
`;
