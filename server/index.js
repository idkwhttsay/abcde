import express from 'express';
import cors from 'cors';
import RSSParser from "rss-parser";

const feedURL = "https://rss.app/feeds/JtWqZ9j1MGcmIdig.xml";
const sportURL = "https://rss.app/feeds/Xr9CLD1w2JQTJxg7.xml";
const lifeURL = "https://rss.app/feeds/f2NttkyvGg6jsY3F.xml";
const eduURL = "https://rss.app/feeds/SZFLk4lqej5hYDyY.xml";
const travelURL = "https://rss.app/feeds/i2FPy18Z1lpmzevt.xml";
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
    response.send( await parse(feedURL));
});

app.get('/edu', async (request, response) => {
    console.log(`GET on /edu`);
    response.send( await parse(eduURL));
});

app.get('/sport', async (request, response) => {
    console.log(`GET on /sport`);
    response.send( await parse(sportURL));
});

app.get('/travel', async (request, response) => {
    console.log(`GET on /travel`);
    response.send( await parse(travelURL));
});

app.get('/life', async (request, response) => {
    console.log(`GET on /life`);
    response.send( await parse(lifeURL));
});

app.get('/search/:str', async (request, response) => {
    const str = request.params.str;
    console.log(`GET on /search/:str: ${str}`);
    response.send(await search(str));
});

export default server;