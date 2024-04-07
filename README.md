# nfact_news_website

Запуск сайта:
1) импортните репозиторий себе в гитхаб
2) откройте консоль для папки frontend и server по отдельности
3) в обоих консолях (frontend и server) напишите команду "npm install" для загрузки всех нужных пакетов
4) в обоих консолях (frontend и server) напишите команду "npm start" и вас автоматически перенаправит на сайт

Главный минус вебсайта - его дизайн, так как я сильнее в бекенде нежели во фронтенде. Бэкенд у меня написан в виде одного большого сервиса, так как я не видел смысла в том чтобы разбивать его на юзкейсы.

Способ обновления новостей:
Я взял ссылку на сайт tengrinews и прогнал ее через приложение rss.app. Таким образом ссылка на сайт tengrinews превратилась в rss-feed и я смог импортить новости в онлайне с сайта tengrinews, это значит что новости всегда up-to-date. Чтобы обновить список новостей достаточно нажать на кнопку "Все Новости" и у вас отобразятся все новости на данный момент.

Категории:
Категории работают следующий образом. Я беру ссылку с tengrinews с определенной категорией, прогоняю его через rss.app и получаю ту же ссылку но в формате rss-feed чтобы импортить новости. Для каждой категории разная ссылка. После этого я парсю новости с ссылок при нажатии на кнопку по заранее определенному id и вывожу сами новости на экран.

При нажатии на любую новость, вас перенаправит на статью оригинал где вы сможете посмотреть саму новость в подробностях.

Функция поиска:
При вводе текста в строку поиска и нажатии на кнопку "Поиск", вам выдаст все статьи ТЕКУЩЕЙ категории которые содержат данный текст. При нажатии на кнопку "Сбросить Поиск", поиск сброситься и вы опять увидите все последние новости текущей категории в Казахстане на данный момент. Поиск работает вне зависимости от регистра букв.

