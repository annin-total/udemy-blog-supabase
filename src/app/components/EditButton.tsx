"use client";

import { useRouter } from "next/navigation";
import React from "react";

type EditButtonProps = {
  id: string;
};

function EditButton({ id }: EditButtonProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/articles/edit/${id}`);
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
      >
        編集
      </button>
    </div>
  );
}

export default EditButton;
