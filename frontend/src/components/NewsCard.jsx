import { Link } from 'react-router-dom';
import { formatDate, stripHtml, truncate } from '../lib/format';

export function NewsCard({ news, compact = false }) {
  return (
    <article className={`news-card ${compact ? 'news-card--compact' : ''}`}>
      <Link to={`/news/${news.id}`} className="news-card__image-link">
        <img src={news.image} alt={news.title} className="news-card__image" />
      </Link>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span>{news.author || '头条新闻'}</span>
          <span>{formatDate(news.publishTime)}</span>
        </div>
        <Link to={`/news/${news.id}`} className="news-card__title">
          {news.title}
        </Link>
        <p className="news-card__description">
          {truncate(news.description || stripHtml(news.content), compact ? 64 : 100)}
        </p>
      </div>
    </article>
  );
}
