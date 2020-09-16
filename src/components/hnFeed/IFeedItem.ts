export interface IHackerNewsStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface IFeedItem extends IHackerNewsStory {
  viewed: boolean;
  comments_url?: string;
}
