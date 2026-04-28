export const INCOME_CATEGORIES = [
  { name: 'Allowance',   bg: '#FFFAD6', color: '#FFDD00', abbr: 'AL' },
  { name: 'Bonus',       bg: '#FFD6A0', color: '#FF9200', abbr: 'BN' },
  { name: 'Borrow',      bg: '#FFD6D6', color: '#FF0000', abbr: 'BR' },
  { name: 'Gift',        bg: '#FFDEF1', color: '#FD008F', abbr: 'GF' },
  { name: 'Investment',  bg: '#BAD0E3', color: '#0B4678', abbr: 'IV' },
  { name: 'Return',      bg: '#C4EFFF', color: '#00BAFD', abbr: 'RT' },
  { name: 'Salary',      bg: '#C5FFD6', color: '#00BC36', abbr: 'SL' },
  { name: 'Other',       bg: '#A8A8A8', color: '#000000', abbr: 'OT' },
]

export const EXPENSE_CATEGORIES = [
  { name: 'Bills',         bg: '#FFFAD6', color: '#FFDD00', abbr: 'BL' },
  { name: 'Borrow',        bg: '#FFD6D6', color: '#FF0000', abbr: 'BR' },
  { name: 'Delivery',      bg: '#CDE9BD', color: '#349400', abbr: 'DL' },
  { name: 'Education',     bg: '#BAD0E3', color: '#0B4678', abbr: 'ED' },
  { name: 'Entertainment', bg: '#CAF1F3', color: '#00BFC9', abbr: 'EN' },
  { name: 'Food',          bg: '#FFD6A0', color: '#FF9200', abbr: 'FD' },
  { name: 'Health',        bg: '#C0D694', color: '#507900', abbr: 'HT' },
  { name: 'Housing',       bg: '#FFDEF1', color: '#FD008F', abbr: 'HS' },
  { name: 'Return',        bg: '#C4EFFF', color: '#00BAFD', abbr: 'RT' },
  { name: 'Shopping',      bg: '#F0DFFF', color: '#9433EA', abbr: 'SH' },
  { name: 'Travel',        bg: '#C5FFD6', color: '#00BC36', abbr: 'TR' },
  { name: 'Other',         bg: '#A8A8A8', color: '#000000', abbr: 'OT' },
]

export const CATEGORY_MAP = Object.fromEntries(
  [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].map(c => [c.name, c])
)

export const CATEGORY_COLOR = Object.fromEntries(
  [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].map(c => [c.name, c])
)
