import axios from "axios";
import { useState, useEffect } from "react";
import Feed from "./Feed";
import './index.css'

function App() {
  const [articles, setArticles] = useState([]);

  console.log(articles);

  const getArticles = async() => {
    try {
      const response = await axios.get("http://localhost:3001/");
      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticles();
  });

  return (
    <>
      <div className="header">
        <h1 style={{textAlign: "center", padding: 10}}>Kazakhstan News Feed</h1>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(9, 1fr)"}}>
          {articles.map((item, i) => {
            return (
              <div className="news-object">
                <a href={item.item.link} className="link">
                  <Feed 
                  key={i}
                  title={item.item.title}
                  link={item.item.link}
                  date={item.item.pubDate}
                  content={item.item.content}
                  />
                </a>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;