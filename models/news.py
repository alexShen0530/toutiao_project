from models.base import *


class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        comment="新闻标题",
    )

    description: Mapped[Optional[str]] = mapped_column(
        String(500),
        nullable=True,
        default=None,
        comment="新闻简介",
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
        comment="新闻内容",
    )

    image: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
        default=None,
        comment="封面图片URL",
    )

    author: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
        default=None,
        comment="作者",
    )

    category_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            "news_category.id",
            ondelete="RESTRICT",
            onupdate="CASCADE",
            name="fk_news_category",
        ),
        nullable=False,
        comment="分类ID",
    )

    views: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        server_default=text("0"),
        comment="浏览量",
    )

    publish_time: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
        comment="发布时间",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        comment="创建时间",
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        onupdate=datetime.now,
        comment="更新时间"
    )

    # 如果你有 NewsCategory 模型，可以打开这个 relationship
    # category: Mapped["NewsCategory"] = relationship(
    #     "NewsCategory",
    #     back_populates="news_list",
    # )

    __table_args__ = (
        Index("fk_news_category_idx", "category_id"),
        Index("idx_publish_time", "publish_time"),
        {
            "mysql_engine": "InnoDB",
            "mysql_charset": "utf8mb4",
            "comment": "新闻表",
        },
    )



