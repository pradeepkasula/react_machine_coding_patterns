export const initialItems = [
    'JavaScript',
    'HTML',
    'CSSsfasf3',
    'React',
    'Angular',
    'Zustand',
    'NextJS',
    'TypeScript',
  ].map((item) => ({
    id: `${item}-${Date.now()}`,
    text: item,
    isEditing: false,
  }));
  