import express from 'express';
import cors from 'cors';
import RSSParser from "rss-parser";

const feedURL = "https://rss.app/feeds/JtWqZ9j1MGcmIdig.xml";
const parser = new RSSParser();
let articles = [];

const parse = async url => {
    const feed = await parser.parseURL(url);

    feed.items.forEach((item) => {
        articles.push({item});
    })
}

parse(feedURL);

let app = express();
app.use(cors());

app.get('/', (request, response) => {
    response.send(articles);
});

const server = app.listen("3001", () => {
    console.log("App is listening at http://localhost:3001");
});

export default server;