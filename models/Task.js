const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxLength: [20, 'name cannot be more than 20 characters']
    },
})

module.exports = mongoose.model('Task', TaskSchema)