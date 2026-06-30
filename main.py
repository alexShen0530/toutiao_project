from fastapi import FastAPI
from routers import news
from fastapi.middleware.cors import CORSMiddleware


# pip install pipreqs
# pipreqs . --force

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 允许的源列表
    allow_credentials=True, # 允许携带cookie
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


app.include_router(news.router)