
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-red-500 text-2xl">Something went wrong!</h2>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
