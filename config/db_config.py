from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

# 创建异步引擎
aysnc_database_url = "mysql+aiomysql://root:7138598Sx%40@localhost:3306/news_app?charset=utf8mb4"
async_engine = create_async_engine(aysnc_database_url, echo=True, pool_size=10, max_overflow=20)



# 创建数据库异步会话
async_session = async_sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)

async def get_db():
    async with async_session() as session:
        try:
            yield session # 返回数据库会话给路由处理函数
            await session.commit()
        except:
            await session.rollback()
            raise
        finally:
            await session.close()

