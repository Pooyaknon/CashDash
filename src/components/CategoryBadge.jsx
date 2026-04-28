import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../config/categories'

export default function CategoryBadge({ category, size = 'md' }) {
  const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]
  const cat = ALL_CATEGORIES.find(c => c.name === category)
  const width  = size === 'sm' ? '2.2rem' : '2.6rem'
  const height = size === 'sm' ? '1.4rem' : '1.6rem'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: width,
        height,
        padding: '0 6px',
        borderRadius: '999px',
        backgroundColor: cat.bg,        
        border: `2px solid ${cat.color}`, 
        color: cat.color,             
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '700',

        flexShrink: 0,
        letterSpacing: '0.02em',
        lineHeight: 1,
      }}
    >
      {cat.abbr}
    </span>
  )
}