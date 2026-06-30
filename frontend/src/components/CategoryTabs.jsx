import { NavLink } from 'react-router-dom';

export function CategoryTabs({ categories = [], activeCategoryId }) {
  return (
    <div className="category-tabs" id="categories">
      {categories.map((category) => {
        const isActive = String(category.id) === String(activeCategoryId);

        return (
          <NavLink
            key={category.id}
            to={`/category/${category.id}`}
            className={`category-tab ${isActive ? 'category-tab--active' : ''}`}
          >
            {category.name}
          </NavLink>
        );
      })}
    </div>
  );
}
