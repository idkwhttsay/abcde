import express from 'express';
import cors from 'cors';
import RSSParser from "rss-parser";

const urls = ["https://rss.app/feeds/JtWqZ9j1MGcmIdig.xml", "https://rss.app/feeds/Xr9CLD1w2JQTJxg7.xml",
"https://rss.app/feeds/f2NttkyvGg6jsY3F.xml", "https://rss.app/feeds/SZFLk4lqej5hYDyY.xml", "https://rss.app/feeds/i2FPy18Z1lpmzevt.xml"];

/*
0 - all
1 - sport
2 - life
3 - edu
4 - travel
*/

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

const search = async (str, id) => {
    const feed = await parser.parseURL(urls[id]);
    let articles = [];
    
    feed.items.forEach((item) => {
        for(let i = 0; i < item.title.length-str.length+1; ++i){
            let ok = 1;
            for(let j = 0; j < Math.min(item.title.length, str.length); ++j){
                if(item.title[i+j].toLowerCase() != str[j].toLowerCase()){
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

app.get('/:id', async (request, response) => {
    const id = request.params.id;
    console.log(`GET on /:id`);
    console.log(id);
    response.send( await parse(urls[id]));
});

app.get('/search/:str/:id', async (request, response) => {
    const str = request.params.str;
    const id = request.params.id;
    console.log(`GET on /search/:str/:id ${str} ${id}`);
    response.send(await search(str, id));
});

export default server;