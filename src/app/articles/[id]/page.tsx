import Image from "next/image";
import React from "react";
import { getArticleById } from "@/blogAPI";
import DeleteButton from "@/app/components/DeleteButton";

async function Article({ params }: { params: { id: string } }) {
  // const id = params.id;
  // const detailArticle = await getArticleById(id);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/${params.id}`, {
    next: { revalidate: 10 },
  });

  const detailArticle = await res.json();

  return (
    <div className="py-8 px-4 md:px-12 bg-slate-50 m-4 rounded-xl h-full">
      <Image
        src={detailArticle.image}
        alt="article"
        width={800}
        height={100}
        className="rounded-xl w-full h-[500px] object-cover mb-5"
      />
      <h1 className="text-3xl font-bold mb-4 text-slate-900">
        {detailArticle.title}
      </h1>
      <div>
        <p className="text-sm text-slate-900 mb-4 leading-6">
          {detailArticle.content}
        </p>
      </div>
      <DeleteButton id={detailArticle.id} />
    </div>
  );
}

export default Article;
