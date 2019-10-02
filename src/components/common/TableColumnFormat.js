export const productFormatter = (cell, row) => {
  if (!cell) return "Lỗi";
  return `<a href=/datas/product/${cell.id}/detail>${cell.name}</a>`;
};

export const routingFormatter = (cell, row) => {
  if (!cell) return "Lỗi";
  return `<a href=/datas/routing/${cell.id}/detail>${cell.name}</a>`;
};

export const bomFormatter = (cell, row) => {
  if (!cell) return "Lỗi";
  return `<a href=/datas/bom/${cell.id}/detail>${cell.name}</a>`;
};
