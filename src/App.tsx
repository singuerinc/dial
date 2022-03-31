import { Bookmarks } from "./bookmarks/Bookmarks";
import { bookmarks } from "./bookmarks/data";
function App() {
  return (
    <div className="mx-6 md:mx-32 md:my-16">
      <div className="my-8 flex md:my-16">
        <h1 className="text-3xl font-light">dial</h1>
      </div>
      <Bookmarks bookmarks={bookmarks} />
    </div>
  );
}

export default App;
