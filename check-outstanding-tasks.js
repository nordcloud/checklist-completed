const marked = require("marked");

module.exports = function (body) {
  if (body === null) {
    return {
      total: 0,
      remaining: 0,
    };
  }

  const tokens = marked.lexer(body, { gfm: true });

  const lists = tokens.filter((token) => token.type === "list");
  const aggregatedlistItems = lists.reduce((acc, curr) => {
    return [...acc, ...curr.items];
  }, []);

  return {
    total: aggregatedlistItems.filter((item) => item.checked !== undefined).length,
    remaining: aggregatedlistItems.filter((item) => item.checked === false).length,
  };
};
