const { queryCapitalized } = require("../utils/StringTransformation")
const Camps = require('../_data/camps.json')

const filtering = (model) => async (req, res, next) => {
  let query

  // Filtering
  const reqQuery = { ...req.query }
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach(param => delete reqQuery[param])
 
  let queryStr = JSON.stringify(reqQuery)
  queryStr = queryStr.replace(/\b(in)\b/g, match => `$${match}`)
  query = model.find(JSON.parse(queryStr))
  console.log(req.query,'request babe')

  //Request transformations
  if(req.query) {
    const queryTransformed = queryCapitalized(reqQuery)
    let queryStr = JSON.stringify(queryTransformed)
    query = model.find(JSON.parse(queryStr))
    // if(req.query.location && req.query.name){
    //   query = Camps.filter(camp => camp.location.includes(queryTransformed.location) && camp.name.includes(queryTransformed.name))
    // } else if(req.query.location && !req.query.name) {
    //   query = Camps.filter(camp => camp.location.includes(queryTransformed.location))
    // } else if(req.query.name && !req.query.location) {
    //   query = Camps.filter(camp => camp.name.includes(queryTransformed.name))
    // } else {
    //   let queryStr = JSON.stringify(queryTransformed)
    //   query = model.find(JSON.parse(queryStr))
    // }
  }
  // if(req.query.location && req.query.name){
  //   res.body = Camps.filter(camp => camp.location.includes(requestTransformed.location) && camp.name.includes(requestTransformed.name))
  //   //res.defineProperty(res, res.body.data, Camps.filter(camp => camp.location.includes(requestTransformed.location) && camp.name.includes(requestTransformed.name)))
  //   res.status(200).json(res.body)
  // } else if(req.query.name && !req.query.location) {
  //   res.body=Camps.filter(camp => camp.name.includes(requestTransformed.name))
  //   res.status(200).json(res.body)
  // } else if (req.query.location && !req.query.name) {
  //   res.body=Camps.filter(camp => camp.location.includes(requestTransformed.location))
  //   res.status(200).json(res.body)
  // } else {
  //   res.status(200).json(res.filtering)
  // }

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 5
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  // Executing query
  const results = await query

  // Pagination result
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.filtering = {
    sucess: true,
    count: results.length,
    pagination,
    data: results
  }

  next()
} 

module.exports = filtering