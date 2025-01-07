"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/blog/${params.id}`);
      const article = await res.json();

      setTitle(article.title);
      setContent(article.content);
      setCategory(article.category);
    };

    fetchArticle();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/blog/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      if (!res.ok) {
        throw new Error("更新に失敗しました");
      }

      router.push(`/articles/${params.id}`);
      router.refresh();
    } catch (error) {
      alert("更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ記事編集</h2>
      <form
        className="bg-slate-100 shadow-md rounded-xl p-6 mb-6"
        onSubmit={handleSave}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            className="shadow rounded w-full border py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            カテゴリ
          </label>
          <select
            className="shadow rounded w-full border py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="Technology">Technology</option>
            <option value="Automotive">Automotive</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            本文
          </label>
          <textarea
            className="shadow rounded w-full border py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlogPage;
