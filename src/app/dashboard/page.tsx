"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <main className="w-11/12 md:w-10/12 mx-auto">
      <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
      <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" />
    </main>
  );
}
