import { useParams } from 'react-router-dom';
import { CategoryTabs } from '../components/CategoryTabs';
import { NewsCard } from '../components/NewsCard';
import { SectionState } from '../components/SectionState';
import { getCategories, getNewsList } from '../lib/api';
import { useAsyncData } from '../lib/hooks';

export function CategoryPage() {
  const { categoryId } = useParams();
  const categoriesState = useAsyncData(() => getCategories(), []);
  const newsState = useAsyncData(() => getNewsList(categoryId, 1, 12), [categoryId]);
  const categories = categoriesState.data || [];
  const currentCategory = categories.find(
    (category) => String(category.id) === String(categoryId)
  );

  return (
    <div className="page-stack">
      <SectionState loading={categoriesState.isPending} error={categoriesState.error}>
        <CategoryTabs categories={categories} activeCategoryId={categoryId} />
      </SectionState>

      <section className="category-hero">
        <h1>{currentCategory?.name || '新闻列表'}</h1>
        <span>聚合实时资讯、重点话题与深度阅读内容。</span>
      </section>

      <SectionState loading={newsState.isPending} error={newsState.error}>
        <section className="category-grid">
          {(newsState.data?.list || []).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </section>
      </SectionState>
    </div>
  );
}
