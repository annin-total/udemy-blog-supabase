"use client";
// import { createArticle } from "@/blogAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreateBlogPage() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("/images/sample-image1.jpg");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !title || !content || !category) {
      alert("すべてのフィールドを入力してください");
      return;
    }
    setIsLoading(true);
    setImage("/images/sample-image1.jpg");
    // await createArticle(id, title, content, image, category);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${apiUrl}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        content,
        category,
        image,
      }),
    });
    // const detailArticle = await res.json();

    setIsLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ新規投稿</h2>
      <form
        className=" bg-slate-100 shadow-md rounded-xl p-6 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            URL
          </label>
          <input
            type="text"
            name="url"
            className="shadow rounded w-full border py-2 px-3  text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            name="title"
            className="shadow rounded w-full border py-2 px-3  text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            カテゴリ
          </label>
          <select
            name="category"
            className="shadow rounded w-full border py-2 px-3  text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
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
            name="content"
            className="shadow rounded w-full border py-2 px-3  text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`py-2 px-4 border rounded-md text-slate-700 text-sm bg-orange-300 ${
            isLoading
              ? " opacity-50 cursor-not-allowed"
              : " hover:bg-orange-400"
          }`}
          disabled={isLoading}
        >
          投稿
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPage;
