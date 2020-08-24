const db = require("../db");

module.exports.index = (req, res) => {
  let products = db.get("products").value();
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = 8;
  let start = (page - 1) * perPage;
  let end = (page - 1) * perPage + perPage;
  res.render("products/index", {
    products: products.slice(start, end),
    totalPage: products.length,
  });
};
