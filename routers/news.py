from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from config.db_config import *
from crud import news as crud_news


#创建APIRouter实例
router = APIRouter(prefix="/api/news", tags=['news'])

@router.get("/categories")
async def get_categories(
        skip: int = 0,
        limit: int = 10,
        db: AsyncSession = Depends(get_db)
):
    categories = await crud_news.get_categories(db, skip, limit)
    return {
        "code": 200,
        "message": "success",
        "data": categories
    }

