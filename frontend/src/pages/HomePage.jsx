import { useDeferredValue } from 'react';
import { Link } from 'react-router-dom';
import { CategoryTabs } from '../components/CategoryTabs';
import { HeroHeadline } from '../components/HeroHeadline';
import { NewsCard } from '../components/NewsCard';
import { SectionState } from '../components/SectionState';
import { SidebarList } from '../components/SidebarList';
import { getCategories, getNewsList } from '../lib/api';
import { useAsyncData } from '../lib/hooks';

function useHomepageData() {
  const categoriesState = useAsyncData(() => getCategories(), []);
  const firstCategoryId = categoriesState.data?.[0]?.id;
  const leadNewsState = useAsyncData(
    () => (firstCategoryId ? getNewsList(firstCategoryId, 1, 7) : Promise.resolve(null)),
    [firstCategoryId]
  );

  return {
    categoriesState,
    leadNewsState,
  };
}

export function HomePage() {
  const { categoriesState, leadNewsState } = useHomepageData();
  const categories = categoriesState.data || [];
  const leadNews = leadNewsState.data?.list || [];
  const deferredLeadNews = useDeferredValue(leadNews);
  const heroNews = deferredLeadNews[0];
  const latestNews = deferredLeadNews.slice(1, 5);
  const sidebarNews = deferredLeadNews.slice(0, 5);

  return (
    <div className="page-stack">
      <SectionState loading={categoriesState.isPending} error={categoriesState.error}>
        <CategoryTabs categories={categories} />
      </SectionState>

      <SectionState loading={leadNewsState.isPending} error={leadNewsState.error}>
        <>
          <HeroHeadline news={heroNews} />
          <section className="home-grid">
            <div className="home-grid__content">
              <div className="section-heading">
                <h2>最新头条</h2>
                {categories[0] ? (
                  <Link to={`/category/${categories[0].id}`} className="section-heading__link">
                    查看更多
                  </Link>
                ) : null}
              </div>
              <div className="news-list">
                {latestNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
            <SidebarList title="热点排行" items={sidebarNews} />
          </section>
        </>
      </SectionState>
    </div>
  );
}
