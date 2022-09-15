const pool = require("../db/connect");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");

const getAllTodos = asyncWrapper(async (req, res, next) => {
  const alltodos = await pool.query("SELECT * FROM todo");
  res.status(StatusCodes.OK).json({
    success: true,
    // count: alltodos.length,
    data: alltodos.rows,
    message: "All todos fetched",
  });
});

const getSingleTodo = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  if (!todo.rows.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No task with id ${id}` });
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: todo.rows,
    message: `Single todo fetched with ID ${id}`,
  });
});

const createTodo = asyncWrapper(async (req, res, next) => {
  const { description } = req.body;
  const todo = await pool.query(
    "INSERT INTO todo (description) VALUES ($1) RETURNING *",
    [description]
  );
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: todo.rows[0],
    message: `Todo created with ID ${req.params.id}`,
  });
});

const updateTodo = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { description } = req.body;

  if (description === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `provided description` });
  }

  const todo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
  );

  if (!todo.rows.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No task with id ${id}` });
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: todo.rows[0],
    message: `Todo updated with ID ${id}`,
  });
});

const deleteTodo = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
  if (!todo.rows.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No task with id ${id}` });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: todo.rows[0],
    message: `Todo deleted with ID ${id}`,
  });
});

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
