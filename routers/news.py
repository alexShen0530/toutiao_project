from fastapi import APIRouter, Depends, Query, HTTPException
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

@router.get("/list")
async def get_news_list(
        category_id: int = Query(..., alias="categoryId"),
        page: int = 1,
        page_size: int = Query(10, alias="pageSize", lt=100),
        db: AsyncSession = Depends(get_db),
):
    # 处理分页规 -> 查询新闻列表 -> 计算总量 -> 计算是否还有更多
    offset = (page - 1) * page_size
    news_list = await crud_news.get_news_list(db, category_id, offset, page_size)
    total = await crud_news.get_news_count(db, category_id)
    has_more = total > offset + len(news_list)
    return {
        "code": 200,
        "message": "success",
        "data": {
            "list": news_list,
            "total": total,
            "hasMore": has_more
        }
    }

@router.get("/detail")
async def get_news_detail(
        id: int = Query(..., alias="id"),
        db: AsyncSession = Depends(get_db),
):
    #查询新闻详情
    news_detail = await crud_news.get_news_detail(db, id)
    if not news_detail:
        raise HTTPException(status_code=404, detail="新闻不存在")

    # 浏览量+1
    views_res = await crud_news.increase_news_views(db, id)
    if not views_res:
        raise HTTPException(status_code=500, detail="浏览量更新失败")

    related_news = await crud_news.get_related_news(db, news_detail.id, news_detail.category_id)

    return {
        "code": 200,
        "message": "success",
        "data": {
            "id": news_detail.id,
            "title": news_detail.title,
            "description": news_detail.description,
            "content": news_detail.content,
            "image": news_detail.image,
            "author": news_detail.author,
            "categoryId": news_detail.category_id,
            "views": news_detail.views,
            "publishTime": news_detail.publish_time.strftime("%Y-%m-%d %H:%M:%S"),
            "relatedNews": related_news
        }
    }

