import * as React from "react";
import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
import { Clock } from "./clock/Clock";
import { Reminders } from "./reminders/Reminders";

function App() {
  return (
    <div className="mx-6 grid w-full grid-cols-12 text-gray-800 md:mx-32 md:my-16">
      <div className="col-span-6">
        <Bookmarks bookmarks={bookmarks} />
      </div>
      <div className="col-span-6 flex flex-col gap-4">
        <Clock />
        <Reminders />
      </div>
    </div>
  );
}

export default App;
