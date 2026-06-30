import { Link } from 'react-router-dom';
import { formatDate, stripHtml, truncate } from '../lib/format';

export function HeroHeadline({ news }) {
  if (!news) {
    return null;
  }

  return (
    <section className="hero-headline" id="headlines">
      <div className="hero-headline__copy">
        <h1>{news.title}</h1>
        <p className="hero-headline__summary">
          {truncate(news.description || stripHtml(news.content), 120)}
        </p>
        <div className="hero-headline__meta">
          <span>{news.author || '头条新闻编辑部'}</span>
          <span>{formatDate(news.publishTime)}</span>
        </div>
        <Link to={`/news/${news.id}`} className="primary-link">
          阅读全文
        </Link>
      </div>
      <div className="hero-headline__visual">
        <img src={news.image} alt={news.title} />
      </div>
    </section>
  );
}
