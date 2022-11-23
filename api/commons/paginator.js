exports.getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: total_items, rows: rows } = data;
  const current_page = page ? page : 1;
  const total_pages = Math.ceil(total_items / limit);

  return { total_items, total_pages, current_page, rows };
};
