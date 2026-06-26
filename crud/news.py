from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
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