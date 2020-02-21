var data = require("../data.json")
var fs = require("fs")
var path = require("path")


exports.GetAssignment = function(id) {
  if (!data['assignment']) {
    data['assignment'] = []
    SaveData()
    return []
  }
  if (id !== undefined) {
    var ids = id.split(",")
    var temp = data['assignment'].filter(function(item){
      return (ids.filter(function(_item){
        return _item == item.id
      }) > 0)
    })
    return temp
  } else {
    return  data['assignment']
  }
}


exports.GetCalendarData = function() {
  if (!data['assignment']) {
    data['assignment'] = []
    SaveData()
    return []
  }
  var temp = data['assignment'].map(function(item){ return {startDate: item.date,name: item.classN,id: item.id } })
  return temp
}


exports.SaveAssignment = function(obj) {
  if (!data['assignment']) {
    data['assignment'] = []
    SaveData()
  }
  obj.id = 'id_' + parseInt(Math.random() * 10000000)
  data['assignment'].push(obj)
  SaveData()
}

exports.DeleteAssignmentByID = function(id) {
  if (!data['assignment']) {
    return true
  }
  var index = data['assignment'].findIndex(function(item) {return id == item.id})
  if(index !=-1) {
    data['assignment'].splice(index,1)
    SaveData()
  } 
  return true
}

exports.SaveFbInfo = function(obj) {
  if (!data['fbinfo']) {
    data['fbinfo'] = []
  }
  data['fbinfo'].push(obj)
  SaveData()
}


exports.GetUser = function(email) {
  if(!data['users']) {
    data['users'] = []
    SaveData()
    return []
  }

  if (email) {
    return data['users'].filter(function(item) {
      return item.email == email
    })

  } else {
    return [];
  }
}


exports.SaveUser = function(email,password) {
  if(!data['users']) {
    data['users'] = []
    SaveData()
  }
  data['users'].push({email,password})
  SaveData()
}




function SaveData() {
  return fs.writeFileSync(path.resolve(__dirname, '../data.json'),JSON.stringify(data))
}