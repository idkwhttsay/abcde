import axios from "axios";
import { useState, useEffect } from "react";
import Feed from "./Feed";
import './index.css'

function App() {
  const [articles, setArticles] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getArticles = async() => {
    try {
      const response = await axios.get("http://localhost:3001/all");
      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const seacrhArticles = async() => {
    try {
      const response = await axios.get(`http://localhost:3001/search/${searchName}`);

      setArticles(response.data);
      console.log(articles);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Новости Казахстана</h1>
        <div class="form__group field">
          <input class="form__field" placeholder="Поиск" name="Новости" id='name' value={searchName} onChange={e => setSearchName(e.target.value)} />
          <label for="name" class="form__label">Поиск</label>
        </div>
        <button class="button-4" onClick={() => {
          seacrhArticles();
        }}>Поиск</button>
        <button class="button-4" onClick={() => {
          getArticles();
        }}>Все Новости</button>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(9, 1fr)"}}>
          {articles.map((item, i) => {
            return (
              <div className="news-object">
                <a href={item.link} className="link">
                  <Feed 
                  key={i}
                  title={item.title}
                  link={item.link}
                  date={item.pubDate}
                  content={item.content}
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