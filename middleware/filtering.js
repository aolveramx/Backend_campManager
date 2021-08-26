
const { queryCapitalized, datesConversion, datesStringConversion } = require("../utils/StringTransformation")
const Camp = require('../models/Camp')

const filtering = (model) => async (req, res, next) => {
  const camps = await Camp.find()
  let query

  // Filtering
  const reqQuery = { ...req.query }
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach(param => delete reqQuery[param])
 
  //Request transformations
  if(req.query) {
    const queryTransformed = queryCapitalized(reqQuery)
    const filterDates = datesConversion(reqQuery)
    let resultDates = {'name':{$in:[]}}
    let resultNameLocation = {}
    let result={}
    
    //Filtering by location and name
    if(req.query.location && req.query.name){
      resultNameLocation = {'location':{$in:[]},'name':{$in:[]}}
      data = camps.filter(camp => camp.location.includes(queryTransformed.location) && camp.name.includes(queryTransformed.name))
      data.forEach(camp => {
        if(!resultNameLocation.location.$in.includes(camp.location)){
          resultNameLocation.location.$in.push(camp.location)
        }
        if(!resultNameLocation.name.$in.includes(camp.name)){
          resultNameLocation.name.$in.push(camp.name)
        }
      })

      //Filtering by location
    } else if(req.query.location && !req.query.name) {
      resultNameLocation = {'location':{$in:[]}}
      data = camps.filter(camp => camp.location.includes(queryTransformed.location))
      data.forEach(camp => {
        (!resultNameLocation.location.$in.includes(camp.location) ? resultNameLocation.location.$in.push(camp.location) : next)
      })
    
      //Filtering by name
    } else if(req.query.name && !req.query.location) {
      resultNameLocation = {'name':{$in:[]}}
      data = camps.filter(camp => camp.name.includes(queryTransformed.name))
      data.forEach(camp => {
        (!resultNameLocation.name.$in.includes(camp.name) ? resultNameLocation.name.$in.push(camp.name) : next)
      })
      
      //No name and location introduced
    } else {
      resultNameLocation = queryTransformed;
    }

    // Filtering by dates
    //if(req.query.to){
    let resultFrom = {'name':{$in:[]}}
    let resultTo = {'name':{$in:[]}}

    camps.forEach(camp => {
      let campDateFrom = datesStringConversion(camp.from)
      if(campDateFrom.year < filterDates.from.year) {
        next
      }else if(campDateFrom.year > filterDates.from.year){
        resultFrom.name.$in.push(camp.name)
        next
      } else if(campDateFrom.year = filterDates.from.year){
        if(campDateFrom.month < filterDates.from.month) {
          next
        }else if(campDateFrom.month > filterDates.from.month){
          resultFrom.name.$in.push(camp.name)
          next
        }else if(campDateFrom.month = filterDates.from.month){
          if(campDateFrom.day < filterDates.from.day) {
            next
          }else if(campDateFrom.day >= filterDates.from.day) {
            resultFrom.name.$in.push(camp.name)
            next
          }
        }
      }
    })
    camps.forEach(camp => {
      let campDateTo = datesStringConversion(camp.to)
      if(filterDates.to.year < campDateTo.year){
        next
      }else if(filterDates.to.year > campDateTo.year){
        resultTo.name.$in.push(camp.name)
        next
      } else if(filterDates.to.year = campDateTo.year){
        if(filterDates.to.month < campDateTo.month) {
          next
        } else if(filterDates.to.month > campDateTo.month){
          resultTo.name.$in.push(camp.name)
          next
        }else if(filterDates.to.month = campDateTo.month){
          if(filterDates.to.day < campDateTo.month){
            next
          }else if(filterDates.to.day >= campDateTo.day){
            resultTo.name.$in.push(camp.name)
            next
          }
        }
      }
    })
    resultFrom.name.$in.filter(campName => resultTo.name.$in.includes(campName) ? resultDates.name.$in.push(campName) : next);
    //}


    //resultNameLocation and resultDates comparaisson
    if(!resultNameLocation.name && !resultNameLocation.location){
      result=resultDates
    } else if(resultNameLocation.location && resultNameLocation.name){
      result={'name':{$in:[]},'location':{$in:resultNameLocation.location.$in}}
      resultNameLocation.name.$in.filter(campName => resultDates.name.$in.includes(campName) ? result.name.$in.push(campName) : next)
    } else if(!resultNameLocation.location && resultNameLocation.name){
      result={'name':{$in:[]}}
    resultNameLocation.name.$in.filter(campName => resultDates.name.$in.includes(campName) ? result.name.$in.push(campName) : console.log(campName,'campname',typeof(campName)))
    } else if(resultNameLocation.location && !resultNameLocation.name){
      result={'name':{$in:resultDates.name.$in},'location':{$in:resultNameLocation.location.$in}}
    }

    //Query generation
    resultStr = JSON.stringify(result)
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
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.filtering = {
    sucess: true,
    total,
    perPage: results.length,
    pagination,
    data: results,
  }

  next()
}

module.exports = filtering
