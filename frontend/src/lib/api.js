const API_BASE_URL = 'http://0.0.0.0:8000';

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`请求失败: ${response.status}`);
  }

  const payload = await response.json();

  if (payload.code !== 200) {
    throw new Error(payload.message || '接口返回异常');
  }

  return payload.data;
}

export function getCategories(limit = 20) {
  return request(`/api/news/categories?skip=0&limit=${limit}`);
}

export function getNewsList(categoryId, page = 1, pageSize = 10) {
  return request(
    `/api/news/list?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`
  );
}

export function getNewsDetail(newsId) {
  return request(`/api/news/detail?id=${newsId}`);
}
