const checkOutstandingTasks = require("./check-outstanding-tasks");

test("Test outstanding tasks found", () => {
  const markdown = `
Hello World
- [ ] testing
- [x] 123
`;
  const results = checkOutstandingTasks(markdown);
  expect(results.total).toBe(2);
  expect(results.remaining).toBe(1);
});

test("Test no outstanding tasks", () => {
  const markdown = `
Hello World
- [x] testing
- [x] 123
`;
  const results = checkOutstandingTasks(markdown);
  expect(results.total).toBe(2);
  expect(results.remaining).toBe(0);
});

test("Test no tasks", () => {
  const markdown = `
Hello World
`;
  const results = checkOutstandingTasks(markdown);
  expect(results.total).toBe(0);
  expect(results.remaining).toBe(0);
});

test("Test dont count normal lists", () => {
  const markdown = `
Hello World
- normal
- [x] task 1
- [ ] task 2
`;
  const results = checkOutstandingTasks(markdown);
  expect(results.total).toBe(2);
  expect(results.remaining).toBe(1);
});
