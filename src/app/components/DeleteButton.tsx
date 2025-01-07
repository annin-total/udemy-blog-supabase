"use client";

// import { deleteArticle } from "@/blogAPI";
import { useRouter } from "next/navigation";
import React from "react";

type DeleteButtonProps = {
  id: string;
};

function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    // await deleteArticle(id);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${apiUrl}/api/${id}`, {
      method: "DELETE",
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        削除
      </button>
    </div>
  );
}

export default DeleteButton;
