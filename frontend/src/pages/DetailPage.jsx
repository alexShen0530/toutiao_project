import { Link, useParams } from 'react-router-dom';
import { NewsCard } from '../components/NewsCard';
import { SectionState } from '../components/SectionState';
import { getNewsDetail } from '../lib/api';
import { formatDate } from '../lib/format';
import { useAsyncData } from '../lib/hooks';

export function DetailPage() {
  const { newsId } = useParams();
  const detailState = useAsyncData(() => getNewsDetail(newsId), [newsId]);
  const detail = detailState.data;

  return (
    <SectionState loading={detailState.isPending} error={detailState.error}>
      {detail ? (
        <div className="detail-layout">
          <article className="detail-article">
            <Link to={`/category/${detail.categoryId}`} className="detail-backlink">
              返回分类
            </Link>
            <header className="detail-header">
              <h1>{detail.title}</h1>
              <div className="detail-header__meta">
                <span>{detail.author || '头条新闻编辑部'}</span>
                <span>{formatDate(detail.publishTime)}</span>
                <span>{detail.views} 次阅读</span>
              </div>
            </header>
            <figure className="detail-cover">
              <img src={detail.image} alt={detail.title} />
            </figure>
            <div className="detail-content">
              {detail.content.split('\n').map((paragraph, index) => (
                <p key={`${detail.id}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="detail-related">
            <div className="section-heading">
              <h2>相关推荐</h2>
            </div>
            <div className="detail-related__list">
              {detail.relatedNews.map((item) => (
                <NewsCard key={item.id} news={item} compact />
              ))}
            </div>
          </aside>
        </div>
      ) : null}
    </SectionState>
  );
}
