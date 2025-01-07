import { notFound } from "next/navigation";
import { Article } from "./types";

export const getAllArticles = async (): Promise<Article[]> => {
  // SSR：キャッシュを無効にしてデータを取得(データが更新されたらブラウザにキャッシュを保存しない)
  const res = await fetch("http://localhost:3001/posts", { cache: "no-store" }); //SSR
  if (!res.ok) {
    throw new Error("データ取得に失敗しました");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const articles = await res.json();
  return articles;
};

export const getArticleById = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 60 },
  }); //ISR
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("データ取得に失敗しました");
  }
  return res.json();
};

export const createArticle = async (
  id: string,
  title: string,
  content: string,
  image: string,
  category: string
): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      title,
      content,
      image,
      category,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString(),
    }),
  });
  return res.json();
};

export const deleteArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
