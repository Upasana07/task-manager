const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomeError } = require('../errors/cstome-error')
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ message: error })
    }

}
const getTask = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id })
    if (!task) {
        return next(createCustomeError('Not found', 404))
    }
    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOneAndDelete({ _id: id })
    res.status(200).json({ message: 'success', task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomeError(`No task with id ${id} found`, 404))
    }
    res.status(200).json({ task })
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }