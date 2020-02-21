//设置localstorage
function Storageset (name, val) {
    localStorage.setItem(name, JSON.stringify(val));
}
//查询localstorage
function Storageget (name) {
    return JSON.parse(localStorage.getItem(name));
}
//增加localstorage
function Storageadd (name, addVal) {
    var oldVal = Storage.get(name);
    var newVal = oldVal.concat(addVal);
    Storageset(name, newVal);
}
//删除localstorage
function Storagedel (name) {
    localStorage.removeItem(name);
}

//判断是否已经存储了assignment
function saveAss() {
    var assObj=Storageget('assignment');
    return Boolean(assObj);
}