from models.base import *

class Category(Base):
    __tablename__ = "news_category"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, comment="分类ID")
    name: Mapped[str] = mapped_column(String(50), unique=True, comment="分类名称", nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, comment="排序序号", nullable=False)

    def __repr__(self):
        return f"<Category(id={self.id}, name={self.name}, sort_order={self.sort_order})>"


