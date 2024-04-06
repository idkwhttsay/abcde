import './index.css'

const Feed = ({title, link, date, content}) => {

    const options = {day: "numeric", month: 'long', year: 'numeric'};

    const articleDate = new Date(date).toLocaleString("ru-RU", options);
    const articleTime = new Date(date).toLocaleString("ru-RU", {timeStyle: 'short'})

    return (
        <>  
            <div className="feed-article">
                <div className='date-time'>
                    <p>{articleTime}</p>
                    <p>{articleDate}</p>
                </div>
                <h3 className='article-title'>{title}</h3>
                <div className='article-photo'>
                    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}} dangerouslySetInnerHTML={{__html: content}}></div>
                </div>
            </div>
        </>
    )
}

export default Feed;