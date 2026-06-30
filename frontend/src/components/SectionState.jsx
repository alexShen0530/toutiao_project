export function SectionState({ loading, error, children }) {
  if (loading) {
    return <div className="state-card">内容加载中...</div>;
  }

  if (error) {
    return <div className="state-card state-card--error">{error}</div>;
  }

  return children;
}
