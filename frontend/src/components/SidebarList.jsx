import { Link } from 'react-router-dom';
import { formatDate } from '../lib/format';

export function SidebarList({ title, items = [] }) {
  return (
    <aside className="sidebar-panel">
      <div className="sidebar-panel__header">
        <h2>{title}</h2>
      </div>
      <div className="sidebar-list">
        {items.map((item, index) => (
          <Link key={item.id} to={`/news/${item.id}`} className="sidebar-list__item">
            <span className="sidebar-list__index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{item.title}</strong>
              <small>{formatDate(item.publishTime)}</small>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
