import { IBookmark } from "./data";

export function Bookmarks({ bookmarks }: { bookmarks: IBookmark[] }) {
  return (
    <ul className="mb-4 grid auto-rows-auto">
      {bookmarks.map((b) => (
        <BookmarkItem bookmark={b} />
      ))}
    </ul>
  );
}

function BookmarkItem({ bookmark }: { bookmark: IBookmark }) {
  if (bookmark.children) {
    return (
      <li>
        <h1 className="font-medium">{bookmark.label}</h1>
        <Bookmarks bookmarks={bookmark.children} />
      </li>
    );
  }

  return (
    <li className="group">
      <a
        href={bookmark.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-4 hover:underline"
      >
        {bookmark.label}
      </a>
      <span className="ml-4 text-gray-500 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
        {bookmark.href}
      </span>
    </li>
  );
}
