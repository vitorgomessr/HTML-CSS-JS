const mongoose = require("mongoose")
const Task = require("./../models/task.model")

const tasks = require("./../../data/tasks.json")

exports.get = (id) => {
    if(id){
        return Task.findById(id)
    }
    return Task.find({})        // retorna toda a lista
}

exports.post = (data)=>{
    const newData = {...data}
    return Task.create(newData)
}

exports.put = (data, id) => {
    return Task.findByIdAndUpdate({_id: id}, data, {new: true})          // sem o new: true, retorna o objeto antes da edição 
}

exports.patch = (data, id)=>{
    const { title, completed, userId } = data
    const updatedAt = Date.now()
    const taskUpdated = { title, completed, userId, updatedAt }

    for(let prop in taskUpdated){
        if(typeof taskUpdated[prop] === "undefined") delete taskUpdated[prop]
    }
    
    return Task.findByIdAndUpdate({_id: id}, taskUpdated)
}

exports.delete = (id)=>{
    return Task.findByIdAndRemove({_id: id})
}