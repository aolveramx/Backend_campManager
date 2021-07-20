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

  //Request transformations
  if(req.query) {
    const queryTransformed = queryCapitalized(reqQuery)
    if(req.query.location && req.query.name){
      let result = {'location':{$in:[]},'name':{$in:[]}}
      data = Camps.filter(camp => camp.location.includes(queryTransformed.location) && camp.name.includes(queryTransformed.name))
      data.forEach(camp => {
        if(!result.location.$in.includes(camp.location)){
          result.location.$in.push(camp.location)
        }
        if(!result.name.$in.includes(camp.name)){
          result.name.$in.push(camp.name)
        }
      })
      let resultStr = JSON.stringify(result)
      query=model.find(JSON.parse(resultStr))

    } else if(req.query.location && !req.query.name) {
      let result = {'location':{$in:[]}}
      data = Camps.filter(camp => camp.location.includes(queryTransformed.location))
      data.forEach(camp => {
        (!result.location.$in.includes(camp.location) ? result.location.$in.push(camp.location) : next)
      })
      let resultStr = JSON.stringify(result)
      query=model.find(JSON.parse(resultStr))
      
    } else if(req.query.name && !req.query.location) {
      let result = {'name':{$in:[]}}
      data = Camps.filter(camp => camp.name.includes(queryTransformed.name))
      data.forEach(camp => {
        (!result.name.$in.includes(camp.name) ? result.name.$in.push(camp.name) : next)
      })
      let resultStr = JSON.stringify(result)
      query=model.find(JSON.parse(resultStr))
    } else {
      let queryStr = JSON.stringify(queryTransformed)
      query = model.find(JSON.parse(queryStr))
    }
  }

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