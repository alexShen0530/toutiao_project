export function formatDate(dateString) {
  if (!dateString) {
    return '';
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function stripHtml(content) {
  if (!content) {
    return '';
  }

  return content.replace(/<[^>]+>/g, '').trim();
}

export function truncate(text, limit = 90) {
  if (!text) {
    return '';
  }

  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}
