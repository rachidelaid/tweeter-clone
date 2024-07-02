export interface AuthorType {
  name: string;
  avatar: { url: string } | null;
  id: string;
  authorId?: string;
}

export interface TweetProps {
  createdAt: Date;
  content: string;
  likes?: AuthorType[];
  retweets?: number;
  image?: string;
  comments?: CommentProps[];
  author: AuthorType;
  id: string;
}

export interface CommentProps {
  likes?: AuthorType[];
  id: string;
  createdAt: Date;
  author: { name: string; avatar: { url: string } | null };
  content: string;
  Media?: { url: string }[];
}
