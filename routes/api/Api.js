
var doAction = require("../doAction")

const ApiUrl = '/api/';

exports.init = function(app){

  app.post(ApiUrl + 'login',function (req,res) {
    var email = req.body.email
    var password = req.body.password
    var users = doAction.GetUser(email)

    if(users.length > 0) {
      if (users[0].password == password) {
        res.cookie('email', email, {path: '/', maxAge: 30*24*3600*1000});
        res.cookie('isLogin', true, {path: '/', maxAge: 30*24*3600*1000});
        return res.json({code: 0});
      }
    } 
    return res.json({code: -1})

  })


  app.post(ApiUrl + 'register',function (req,res) {
    var email = req.body.email
    var password = req.body.password
    var users = doAction.GetUser(email)

    if(users.length > 0) {
      return res.json({code: -1})
    } 
    doAction.SaveUser(email,password)
    return res.json({code: 0})
  })

  app.get(ApiUrl + 'exit',function (req,res) {
    res.cookie('email', '', { expires: new Date(0)});
    res.cookie('fburl', '', { expires: new Date(0)});
    res.cookie('isLogin', '', { expires: new Date(0)});
    res.redirect("/")
  })

  app.post(ApiUrl + 'AddAssignment',function (req,res) {
    var {name,classN,date,time } = req.body
    doAction.SaveAssignment({name,classN,date,time})

    return res.json({code: 0})
  })

  app.post(ApiUrl + 'deleteAssignmentByID',function (req,res) {
    var { id } = req.body
    doAction.DeleteAssignmentByID(id)
    
    return res.json({code: 0})
  })

  app.post(ApiUrl + 'SaveFbInfo',function (req,res) {
    var {name,fburl } = req.body
    doAction.SaveFbInfo({ name, fburl})
    res.cookie('email', name, {path: '/', maxAge: 30*24*3600*1000});
    res.cookie('fburl', fburl, {path: '/', maxAge: 30*24*3600*1000});
    res.cookie('isLogin', true, {path: '/', maxAge: 30*24*3600*1000});
    return res.json({code: 0})
  })
}

