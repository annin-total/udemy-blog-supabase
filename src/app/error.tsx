"use client";

import React from "react";

function Error({ reset }: { reset: () => void }) {
  return (
    <div className="bg-red-100 text-red-500 p-4 rounded-md max-w-md mx-auto m-4 border-l-4 border-red-500">
      <h3 className="mb-2 font-bold">エラーが発生しました</h3>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-all duration-300"
        onClick={() => reset()}
      >
        もう一度試す
      </button>
    </div>
  );
}

export default Error;
