export interface IRedditStory {
  id: string;
  title: string;
  url: string;
}

export interface IFeedItem extends IRedditStory {
  viewed: boolean;
}

export type RedditResponse = {
  data: {
    children: { data: IRedditStory }[];
  };
};
