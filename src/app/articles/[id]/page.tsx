import Image from "next/image";
import React from "react";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";

async function Article({ params }: { params: { id: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/${params.id}`, {
    next: { revalidate: 10 },
  });

  const article = await res.json();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <time className="text-gray-500 text-sm">
              {new Date(article.createdAt).toLocaleDateString("ja-JP")}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n").map((paragraph, index) =>
              paragraph ? (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t">
            <EditButton id={article.id} />
            <DeleteButton id={article.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
