from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from models.news_category import Category
from models.news import News


async def get_categories(
        db: AsyncSession,
        skip: int = 0,
        limit: int = 10
):
    result = select(Category).offset(skip).limit(limit)
    categories = await db.execute(result)
    return categories.scalars().all()


async def get_news_list(
        db: AsyncSession,
        category_id: int,
        skip: int,
        limit: int
):
    result = select(News).where(News.category_id == category_id).offset(skip).limit(limit)
    news = await db.execute(result)
    return news.scalars().all()

async def get_news_count(
        db: AsyncSession,
        category_id: int
):
    result = select(func.count(News.id)).where(News.category_id == category_id)
    news_count = await db.execute(result)
    return news_count.scalar_one() # 只允许返回一个 返回多个或者0个 报错

async def get_news_detail(
        db: AsyncSession,
        news_id: int
):
    result = select(News).where(News.id == news_id)
    news = await db.execute(result)
    return news.scalar_one_or_none() # 只允许返回一个 返回多个或者0个 报错

async def increase_news_views(
        db: AsyncSession,
        news_id: int
):
    stmt = update(News).where(News.id == news_id).values(views=News.views + 1)
    result = await db.execute(stmt)
    await db.commit()

    return result.rowcount > 0

async def get_related_news(
        db: AsyncSession,
        news_id: int,
        category_id: int,
        limit: int = 5
):
    result = (select(News).where(News.category_id == category_id,
                                News.id != news_id).
              order_by(News.views.desc()).limit(limit))
    related_news = await db.execute(result)
    return [
        {
            "id": news.id,
            "title": news.title,
            "description": news.description,
            "image": news.image,
            "author": news.author,
            "categoryId": news.category_id,
            "views": news.views,
            "publishTime": news.publish_time.strftime("%Y-%m-%d %H:%M:%S"),
        } for news in related_news.scalars().all()
    ]

