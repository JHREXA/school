import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import articles from "./article-content";
import { NotFoundPage } from "./NotFoundPage";
import { BringComments } from "../components/BringComments";
import { CommentForm } from "../components/CommentForm";
import { useLoggedUser } from "../hooks/loggedUser";

export const ArticlePage = () => {
  const [blogInfo, setBlogInfo] = useState({
    vote: 0,
    comment: [],
    canLike: false,
  });
  const { canLike } = blogInfo;
  const { articleId } = useParams();
  const { user, isLoading } = useLoggedUser();

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const token = user && (await user.getIdToken());
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `http://localhost:8080/api/blog/${articleId}`,
          { headers }
        );
        console.log("Article data:", response.data);
        setBlogInfo({
          vote: response.data.vote,
          comments: response.data.comment,
          canLike: response.data.canLike,
        });
      } catch (error) {
        console.error("Error fetching article info:", error);
      }
    };

    if (user && !isLoading) {
      loadInfo();
    }
  }, [articleId, user, isLoading]);

  const article = articles.find((article) => article.name === articleId);

  const like = async () => {
    try {
      const token = user && (await user.getIdToken());
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.put(
        `http://localhost:8080/api/blog/${articleId}/plusone`,
        null,
        { headers }
      );
      const updated = response.data;
      setBlogInfo(updated);
    } catch (error) {
      console.error("Error liking the article:", error);
    }
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      {user ? (
        <button onClick={like}>{canLike ? "💖" : "Tu aimes"}</button>
      ) : (
        <button>Connectez-vous pour voter</button>
      )}
      <h4>Este artículo tiene {blogInfo.vote} votos.</h4>
      <img src={article.img} alt={article.title} />
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {user ? (
        <CommentForm
          articleName={articleId}
          updatedArticle={(update) => setBlogInfo(update)}
        />
      ) : (
        <button>Connectez-vous pour commenter</button>
      )}
      <h4>Comentarios:</h4>
      <BringComments comments={blogInfo.comments} />
    </>
  );
};
