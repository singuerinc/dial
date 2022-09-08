import * as React from "react";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";

function App() {
  return (
    <div className="mx-6 md:mx-32 md:my-16">
      <Bookmarks bookmarks={bookmarks} />
    </div>
  );
}

export default App;
