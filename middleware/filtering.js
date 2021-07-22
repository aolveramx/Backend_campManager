const { queryCapitalized, datesConversion, datesStringConversion } = require("../utils/StringTransformation")
const Camps = require('../_data/camps.json')

const filtering = (model) => async (req, res, next) => {
  let query
  let resultStr = ''

  // Filtering
  const reqQuery = { ...req.query }
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach(param => delete reqQuery[param])
 
  // let queryStr = JSON.stringify(reqQuery)
  // queryStr = queryStr.replace(/\b(in)\b/g, match => `$${match}`)
  // query = model.find(JSON.parse(queryStr))


  //Request transformations
  if(req.query) {
    const queryTransformed = queryCapitalized(reqQuery)
    console.log(reqQuery,'reqQuery')
    const filterDates = datesConversion(reqQuery)
    console.log(filterDates,'dates')
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
      resultStr = JSON.stringify(result)

    } else if(req.query.location && !req.query.name) {
      let result = {'location':{$in:[]}}
      data = Camps.filter(camp => camp.location.includes(queryTransformed.location))
      data.forEach(camp => {
        (!result.location.$in.includes(camp.location) ? result.location.$in.push(camp.location) : next)
      })
      resultStr = JSON.stringify(result)
      
    } else if(req.query.name && !req.query.location) {
      let result = {'name':{$in:[]}}
      data = Camps.filter(camp => camp.name.includes(queryTransformed.name))
      data.forEach(camp => {
        (!result.name.$in.includes(camp.name) ? result.name.$in.push(camp.name) : next)
      })
      resultStr = JSON.stringify(result)
      
    } else {
      resultStr = JSON.stringify(queryTransformed)
    }

    if(req.query.to){
      let result1 = []
      let result2 = []
      Camps.forEach(camp => {
        let campDateFrom = datesStringConversion(camp.from)
        if(campDateFrom.year < filterDates.from.year) {
          next
        }else if(campDateFrom.year > filterDates.from.year){
          next
        } else if(campDateFrom.year = filterDates.from.year){
          if(campDateFrom.month < filterDates.from.month) {
            next
          }else if(campDateFrom.month > filterDates.from.month){
            result1.push(camp)
            next
            if(campDateFrom.day < filterDates.from.day) {
              next
            }else if(campDateFrom.day >= filterDates.from.day){
              result1.push(camp)
              next
            }
          }
        }
      })
      result1.forEach(camp => console.log(camp.name))

      Camps.forEach(camp => {
        let campDateTo = datesStringConversion(camp.to)
        if(filterDates.to.year < campDateTo.year){
          next
        }else if(filterDates.to.year > campDateTo.year){
          result2.push(camp)
          next
        } else if(filterDates.to.year = campDateTo.year){
          if(filterDates.to.month < campDateTo.month) {
          } else if(filterDates.to.month > campDateTo.month){
            result2.push(camp)
            next
          }else if(filterDates.to.month = campDateTo.month){
            if(filterDates.to.day < campDateTo.month){
            }else if(filterDates.to.day >= campDateTo.day){
              result2.push(camp)
              next
            }
          }
        }
      })

      const result = []
      result1.filter(camp => result2.includes(camp) ? result.push(camp) : next);
      console.log(result)
    }
    //TODO - move the logic to other page and only call the function to filter - concat the results with the name and location result to multiple search

    query = model.find(JSON.parse(resultStr))
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