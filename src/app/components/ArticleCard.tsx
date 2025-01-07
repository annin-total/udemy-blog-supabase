import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Article } from "@/types";

type ArticleListProps = {
  article: Article;
};

function ArticleCard({ article }: ArticleListProps) {
  return (
    <div>
      <article
        className="shadow my-4 bg-slate-50 rounded-xl p-4"
        key={article.id}
      >
        <Link
          href={`/articles/${article.id}`}
          className="hover:opacity-75 transition-all duration-300"
        >
          <Image
            src={article.image}
            alt="article"
            width={800}
            height={400}
            className="rounded-xl w-full h-[500px] object-cover mb-4"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/articles/${article.id}`}
            className="text-blue-700 pb-4 font-bold"
          >
            {article.category}
          </Link>
          <Link
            href={`/articles/${article.id}`}
            className="text-slate-900 text-3xl font-bold hover:text-gray-700 pb-4"
          >
            {article.title}
          </Link>
          <p className="text-sm text-slate-400 pb-4">
            Published on {new Date(article.createdAt).toLocaleString()}
          </p>
          <Link
            href={`/articles/${article.id}`}
            className="text-sm text-slate-900 hover:text-gray-700 pb-4 leading-6"
          >
            {article.content.length > 150
              ? article.content.slice(0, 150) + "..."
              : article.content}
          </Link>
          <Link
            href={`/articles/${article.id}`}
            className="text-pink-900 hover:text-pink-700 hover:underline"
          >
            続きを読む
          </Link>
        </div>
      </article>
    </div>
  );
}

export default ArticleCard;
