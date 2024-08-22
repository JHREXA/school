import { ArticleList } from "../components/ArticleList";
import articles from "./article-content";

export const ArticleListPage = () => {
  return (
    <>
      <h1>Articles Disponibles</h1>
      <ArticleList articles={articles} />
    </>
  );
};
