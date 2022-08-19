const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'articles',
  password: 'password',
  port: 5432,
})

const path = require('node:path');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM published ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM published WHERE user_name = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    let { user_name, heading, article, image, thumbnail, status } = request.body
    console.log(request.body)
    image = 'blogs/' + (image.split('\\')).pop()
    pool.query('INSERT INTO published (user_name, heading, article, image, thumbnail, status) VALUES ($1, $2, $3, $4, $5, $6)', [user_name, heading, article, image, thumbnail, status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM published WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
  }