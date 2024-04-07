import express from 'express';
import cors from 'cors';
import RSSParser from "rss-parser";

const feedURL = "https://rss.app/feeds/JtWqZ9j1MGcmIdig.xml";
const parser = new RSSParser();

let app = express();
app.use(cors());

const server = app.listen("3001", () => {
    console.log("App is listening at http://localhost:3001");
});

const parse = async url => {
    const feed = await parser.parseURL(url);

    let articles = [];

    feed.items.forEach((item) => {
        articles.push({item});
    })

    return articles;
}

app.get('/all', async (request, response) => {
    response.send( await parse(feedURL));
});

export default server;