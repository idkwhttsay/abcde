import axios from "axios";
import { useState, useEffect } from "react";
import Feed from "./Feed";
import './index.css'

function App() {
  const [articles, setArticles] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [ID, setID] = useState(0);

  const getArticles = async(id) => {
    try {
      const response = await axios.get(`http://localhost:3001/${id}`);
      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const seacrhArticles = async(id) => {
    try {
      const response = await axios.get(`http://localhost:3001/search/${searchName}/${id}`);

      setArticles(response.data);
      console.log(articles);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticles(0);
  }, []);

  return (
    <>
      <div className="header">
        <h1>Новости Казахстана</h1>
          <div class="dropdown" style={{marginLeft: "40%"}}>
            <button class="button-4">Категории Новостей</button>
            <div class="dropdown-content">
              <button href="#" onClick={() => {
                getArticles(0);
                setID(0);
              }}>Все Новости</button>
              <button href="#" onClick={() => {
                getArticles(2);
                setID(2);
              }}>Жизнь</button>
              <button href="#" onClick={() => {
                getArticles(1);
                setID(1);
              }}>Спорт</button>
              <button href="#" onClick={() => {
                getArticles(4);
                setID(4);
              }}>Путешествия</button>
              <button href="#" onClick={() => {
                getArticles(3);
                setID(3);
              }}>Образование</button>
            </div>
          </div>
          <button class="button-4" onClick={() => {
            getArticles(ID);
            setSearchName('');
          }}>Сбросить Поиск</button>
          <button class="button-4" onClick={() => {
            seacrhArticles(ID);
          }}>Поиск</button>
          <div class="form__group field">
            <input class="form__field" placeholder="Поиск" name="Новости" id='name' value={searchName} onChange={e => setSearchName(e.target.value)} />
            <label for="name" class="form__label">Поиск</label>
          </div>
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