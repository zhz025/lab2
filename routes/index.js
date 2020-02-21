
var doAction = require("./doAction")


exports.view = function (req,res ) {
  var assignment = doAction.GetAssignment(req.query.id)
  res.render('index',{assignment,fburl: req.cookies.fburl})
}

exports.Assignment = function (req,res ) {
  res.render('Assignment')
}

exports.calendar = function (req,res ) {
  var temp = doAction.GetCalendarData()
  res.render('calendar',{data: temp })
}

exports.Todolist = function (req,res ) {
  res.render('Todolist')
}

exports.Planforme = function (req,res ) {
  var assignment = doAction.GetAssignment(req.query.id)
  res.render('Planforme',{assignment})
}


