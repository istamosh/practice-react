import Articles from "./components/Articles";

import { useEffect, useState } from "react";
import ArticleProps from "./src/types";
import { Button } from "flowbite-react";

function App({ articles }: ArticleProps) {
  const [sorted, setSorted] = useState(articles);

  // initial state sort upvotes in desc. order
  useEffect(() => {
    setSorted((prev) => [...prev].sort((a, b) => b.upvotes - a.upvotes));
  }, []);

  // listen to the change
  useEffect(() => {
    console.log(sorted);
  }, [sorted]);

  const handleMostUpvoted = () => {
    // Logic for most upvoted articles
    setSorted((prev) => [...prev].sort((a, b) => b.upvotes - a.upvotes));
  };

  const handleMostRecent = () => {
    // Logic for most recent articles
    setSorted((prev) =>
      [...prev].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    );
  };
  return (
    <>
      <div className="App">
        <div className="flex flex-row justify-center gap-x-1 my-20">
          <label className="form-hint mb-0 text-uppercase font-weight-light">
            Sort By
          </label>
          <Button
            data-testid="most-upvoted-link"
            className="small"
            onClick={handleMostUpvoted}
          >
            Most Upvoted
          </Button>
          <Button
            data-testid="most-recent-link"
            className="small"
            onClick={handleMostRecent}
          >
            Most Recent
          </Button>
        </div>
        <Articles articles={sorted} />
      </div>
    </>
  );
}

export default App;
