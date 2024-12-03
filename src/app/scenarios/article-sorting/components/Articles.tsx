import React from "react";
import ArticleProps from "../src/types";

function Articles({ articles = [] }: ArticleProps) {
  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr data-testid="article" key="article-index">
            <td data-testid="article-title">Article 1 title</td>
            <td data-testid="article-upvotes">Article 1 upvotes</td>
            <td data-testid="article-date">Article 1 date</td>
          </tr>
        </tbody> */}
        <tbody>
          {articles.map((row, i) => (
            <tr data-testid="article" key={`article-index-${i}`}>
              <td data-testid="article-title">{row.title}</td>
              <td data-testid="article-upvotes">{row.upvotes}</td>
              <td data-testid="article-date">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
