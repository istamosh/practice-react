type Article = {
  title: string;
  upvotes: number;
  date: string;
};
export default interface ArticleProps {
  articles: Article[];
}
