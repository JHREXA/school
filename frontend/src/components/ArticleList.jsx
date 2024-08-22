import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <>
      {articles.map((article) => (
        <Link key={article.name} to={`/blog/${article.name}`}>
          <div className="article-list-element">
            <h2>{article.title}</h2>
            <img className="article-list-image" src={article.img} />
          </div>
          <p>{article.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};
