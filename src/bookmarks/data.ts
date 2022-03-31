export type IBookmark = {
  label: string;
  href?: string;
  children?: IBookmark;
};

export const bookmarks = [
  {
    label: "Ports",
    children: [
      {
        label: "1234",
        href: "http://localhost:1234/",
      },
      {
        label: "8080",
        href: "http://localhost:8080/",
      },
      {
        label: "8888",
        href: "http://localhost:8888/",
      },
    ],
  },
  {
    label: "Other",
    children: [
      {
        label: "Rotten Tomatoes",
        href: "http://rottentomatoes.com",
      },
      {
        label: "mnmll.ist",
        href: "https://mnmll.ist/",
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
        label: "Inbox",
        href: "https://inbox.google.com",
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
        href: "https://www.indiehackers.com/",
        label: "Indie Hackers",
      },
      {
        href: "https://www.wired.com/",
        label: "Wired",
      },
      {
        href: "http://www.ted.com/",
        label: "Ted Talks",
      },
      {
        href: "http://www.forbes.com/technology/",
        label: "Forbes Tech",
      },
      {
        label: "El País",
        href: "http://elpais.com",
      },
      {
        label: "New York Times",
        href: "http://www.nytimes.com",
      },
      {
        label: "Diario Olé",
        href: "http://www.ole.com.ar",
      },
      {
        label: "Planeta Boca Juniors",
        href: "http://www.planetabocajuniors.com.ar",
      },
      {
        label: "Medium",
        href: "https://medium.com",
      },
      {
        label: "Ciencia de Sofá",
        href: "http://cienciadesofa.com",
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
        href: "http://davidwalsh.name/",
        label: "David Walsh",
      },
      {
        href: "http://derickbailey.com/",
        label: "Derick Bailey",
      },
      {
        href: "http://alistapart.com/",
        label: "A List Apart",
      },
      {
        label: "Can I use",
        href: "http://caniuse.com/",
      },
      {
        label: "HTML5 Updates",
        href: "http://updates.html5rocks.com",
      },
      {
        label: "codrops",
        href: "http://tympanus.net/codrops",
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
        href: "http://news.ycombinator.com",
      },
      {
        label: "The Verge",
        href: "http://theverge.com",
      },
      {
        label: "The Next Web",
        href: "http://thenextweb.com",
      },
      {
        label: "JetBrains Blog",
        href: "http://blog.jetbrains.com",
      },
      {
        label: "Engadget",
        href: "http://www.engadget.com",
      },
      {
        label: "Gizmodo ES",
        href: "http://es.gizmodo.com",
      },
    ],
  },
  {
    label: "Tech",
    children: [
      {
        label: "GitHub",
        href: "https://github.com/singuerinc",
      },
      {
        label: "GitLab",
        href: "https://gitlab.com/singuerinc",
      },
      {
        label: "Carbon - Code images",
        href: "https://carbon.now.sh/",
      },
      {
        label: "Stackoverflow",
        href: "http://stackoverflow.com",
      },
      {
        label: "Product Hunt",
        href: "https://www.producthunt.com/",
      },
    ],
  },
  {
    label: "Social",
    children: [
      {
        label: "Trakt.tv",
        href: "https://trakt.tv/dashboard",
      },
    ],
  },
  {
    label: "Funny",
    children: [
      {
        label: "Commit Strip",
        href: "http://commitstrip.com",
      },
      {
        label: "The Coding Love",
        href: "http://thecodinglove.com",
      },
    ],
  },
  {
    label: "Projects",
    children: [
      {
        label: "Artstagram",
        href: "https://artstagram.singuerinc.com/",
      },
      {
        label: "Bi",
        href: "https://bi.singuerinc.com/",
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
        label: "Subway",
        href: "https://subway-singuerinc.netlify.app/",
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
        label: "The Ultralinx",
        href: "http://theultralinx.com",
      },
      {
        label: "Linxspiration",
        href: "http://linxspiration.com",
      },
      {
        label: "Designspiration",
        href: "http://designspiration.net",
      },
      {
        label: "Unsplash",
        href: "https://unsplash.com/",
      },
    ],
  },
  {
    label: "Music",
    children: [
      {
        label: "musicradar",
        href: "http://www.musicradar.com/",
      },
    ],
  },
];
