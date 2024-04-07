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

const parse = async () => {
    const feed = await parser.parseURL(feedURL);

    let articles = [];

    feed.items.forEach((item) => {
        articles.push(item);
    })

    return articles;
}

const search = async (str) => {
    const feed = await parser.parseURL(feedURL);
    let articles = [];
    
    feed.items.forEach((item) => {
        for(let i = 0; i < item.title.length-str.length+1; ++i){
            let ok = 1;
            for(let j = 0; j < Math.min(item.title.length, str.length); ++j){
                if(item.title[i+j] != str[j]){
                    ok = 0;
                }
            }

            if(ok){
                articles.push(item);
                break;
            }
        }
    });

    return articles;
}

app.get('/all', async (request, response) => {
    console.log(`GET on /all`);
    // console.log(await parse(feedURL));
    response.send( await parse(feedURL));
});

app.get('/search/:str', async (request, response) => {
    const str = request.params.str;
    console.log(`GET on /search/:str: ${str}`);
    // console.log(await search(str));
    response.send(await search(str));
});

export default server;