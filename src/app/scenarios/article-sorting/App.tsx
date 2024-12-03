import React from "react";

import { ARTICLES_DATA } from "./constants";

import ArticleSorter from "./ArticleSorter";

const App = () => {
  return <ArticleSorter articles={ARTICLES_DATA} />;
};

export default App;
