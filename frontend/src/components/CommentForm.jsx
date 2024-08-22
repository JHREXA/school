import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useLoggedUser } from "../hooks/loggedUser";

export const CommentForm = ({ articleName, updatedArticle }) => {
  const [comment, setComment] = useState("");
  const { user } = useLoggedUser();

  const addComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté pour ajouter un commentaire.");
      return;
    }

    try {
      const token = await user.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `http://localhost:8080/api/blog/${articleName}/comments`,
        {
          text: comment,
        },
        {
          headers,
        }
      );

      const updated = response.data;
      updatedArticle(updated);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Une erreur est survenue lors de l'ajout du commentaire.");
    }
  };

  return (
    <div>
      <h3>Commentaire</h3>
      {user && <p>Vous êtes connecté comme : {user.email}</p>}
      <form onSubmit={addComment}>
        <label>
          Commentez:
          <textarea
            rows="5"
            cols="20"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  articleName: PropTypes.string.isRequired,
  updatedArticle: PropTypes.func.isRequired,
};
