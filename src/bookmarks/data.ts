export type IBookmark = {
  label: string;
  href?: string;
  children?: IBookmark[];
};

export const bookmarks = [
  {
    label: "Lifestyle",
    children: [
      {
        label: "The Simple Letter",
        href: "https://jessicarosewilliams.substack.com/",
      },
      {
        label: "Be more with less",
        href: "https://bemorewithless.com/",
      }
    ],
  },
  {
    label: "Projects",
    children: [
      {
        label: "Goals",
        href: "https://goals.singuerinc.com/goal/water",
      },
      {
        label: "Better DNI",
        href: "https://better-dni.singuerinc.com/",
      },
      {
        label: "Overlay",
        href: "https://overlay.singuerinc.com/",
      },
      {
        label: "Tomeito",
        href: "https://tomeito-app.singuerinc.com/",
      },
      {
        label: "Artstagram",
        href: "https://artstagram.singuerinc.com/",
      },
      {
        label: "Bi",
        href: "https://bi.singuerinc.com/",
      },
      {
        label: "Spanish word of the day",
        href: "https://spanish-wotd.singuerinc.com/",
      },
      {
        label: "Swedish word of the day",
        href: "https://swotd.singuerinc.com/",
      },
      {
        label: "Bashtards",
        href: "https://bashtards.netlify.app/",
      },
      {
        label: "Spanish Car Plate",
        href: "https://spanish-car-plate.singuerinc.com/",
      },
      {
        label: "Blog",
        href: "https://blog.singuerinc.com/",
      },
      {
        label: "Subway",
        href: "https://subway-singuerinc.netlify.app/",
      },
    ],
  },
  {
    label: "Movies/Series",
    children: [
      {
        label: "Rotten Tomatoes",
        href: "https://rottentomatoes.com",
      },
      {
        label: "IMDB",
        href: "https://imdb.com",
      },
    ],
  },
  {
    label: "Main",
    children: [
      {
        label: "Mail",
        href: "https://mail.google.com",
      },
      {
        label: "Whatsapp",
        href: "https://web.whatsapp.com",
      },
      {
        label: "Drive",
        href: "https://drive.google.com/drive/#my-drive",
      },
      {
        label: "Calendar",
        href: "https://calendar.google.com",
      },
      {
        label: "Dropbox",
        href: "https://www.dropbox.com/home",
      },
      {
        label: "Tweetdeck",
        href: "https://tweetdeck.twitter.com",
      },
      {
        label: "Trello",
        href: "https://trello.com/",
      },
    ],
  },
  {
    label: "News + Blogs",
    children: [
      {
        href: "https://jaredpalmer.com/",
        label: "Jared Palmer",
      },
      {
        href: "https://www.wired.com/",
        label: "Wired",
      },
      {
        href: "https://www.ted.com/",
        label: "Ted Talks",
      },
      {
        href: "https://www.forbes.com/technology/",
        label: "Forbes Tech",
      },
      {
        label: "El País",
        href: "https://elpais.com",
      },
      {
        label: "New York Times",
        href: "https://www.nytimes.com",
      },
      {
        label: "Planeta Boca Juniors",
        href: "https://www.planetabocajuniors.com.ar",
      },
      {
        label: "Medium",
        href: "https://medium.com",
      },
      {
        label: "Vice News",
        href: "https://news.vice.com/es",
      },
      {
        label: "TED",
        href: "https://www.ted.com/",
      },
      {
        label: "Recode",
        href: "https://www.recode.net/",
      },
    ],
  },
  {
    label: "Web Dev",
    children: [
      {
        href: "https://jrsinclair.com/",
        label: "James Sinclair",
      },
      {
        href: "https://changelog.com/podcasts",
        label: "Changelog Podcasts",
      },
      {
        href: "https://dzone.com/",
        label: "DZone",
      },
      {
        href: "https://dev.to/",
        label: "DEV",
      },
      {
        href: "https://ponyfoo.com/",
        label: "PonyFoo",
      },
      {
        href: "https://davidwalsh.name/",
        label: "David Walsh",
      },
      {
        href: "https://alistapart.com/",
        label: "A List Apart",
      },
      {
        label: "Can I use",
        href: "https://caniuse.com/",
      },
      {
        label: "codrops",
        href: "https://tympanus.net/codrops",
      },
      {
        label: "Egghead.io",
        href: "https://egghead.io",
      },
      {
        label: "reddit #javascript",
        href: "https://www.reddit.com/r/javascript/",
      },
      {
        label: "reddit #node",
        href: "https://www.reddit.com/r/node/",
      },
      {
        label: "Overreacted",
        href: "https://overreacted.io/",
      },
      {
        label: "Dave Taylor",
        href: "https://davetayls.me/",
      },
      {
        label: "Every Layout",
        href: "https://every-layout.dev/",
      },
    ],
  },
  {
    label: "Tech News",
    children: [
      {
        href: "https://www.producthunt.com/",
        label: "Product Hunt",
      },
      {
        href: "https://news.layervault.com/",
        label: "Designer News",
      },
      {
        label: "Hacker News",
        href: "https://news.ycombinator.com",
      },
      {
        label: "The Verge",
        href: "https://theverge.com",
      },
      {
        label: "The Next Web",
        href: "https://thenextweb.com",
      },
    ],
  },
  {
    label: "Tech",
    children: [
      {
        label: "Product Hunt",
        href: "https://www.producthunt.com/",
      },
    ],
  },
  {
    label: "Inspiration",
    children: [
      {
        label: "ArtStation",
        href: "https://www.artstation.com/",
      },
      {
        label: "Dribbble",
        href: "https://dribbble.com/",
      },
      {
        label: "Designspiration",
        href: "https://designspiration.net",
      },
    ],
  },
  {
    label: "Music",
    children: [
      {
        label: "musicradar",
        href: "https://www.musicradar.com/",
      },
    ],
  },
  {
    label: "Others",
    children: [
      {
        label: "mnmll.ist",
        href: "https://mnmll.ist/",
      },
    ],
  },
];
