from sqlalchemy.orm import DeclarativeBase
from datetime import datetime
from typing import Optional
from sqlalchemy import (
    String,
    Text,
    TIMESTAMP,
    ForeignKey,
    Index,
    text,
    Integer
)
from sqlalchemy import DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass

