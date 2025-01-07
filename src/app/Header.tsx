import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="py-5 px-10 flex justify-between items-center border-b">
      <div>
        <nav className="text-2xl font-bold">
          <Link href="/">Next.js 13 blog</Link>
        </nav>
      </div>
      <div>
        <nav className="text-sm bg-orange-200 px-3 py-1 rounded-md text-black">
          <Link href="/articles/new">記事を書く</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
