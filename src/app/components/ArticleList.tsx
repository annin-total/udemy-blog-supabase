import { Article } from "@/types";
import React from "react";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  articles: Article[];
};

function ArticleList({ articles }: ArticleListProps) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return <div>記事がありません</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
