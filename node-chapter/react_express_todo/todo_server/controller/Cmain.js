const { Todo } = require('../models/index')


const get_todo = async (req, res) => {

    try {
        const todoList =  await Todo.findAll({})
        res.json(todoList);

    } catch (err) {
        res.json([]);
    }
};

const post_todo = async (req, res) => {

    const { title, done } = req.body;

    try {

      const createTodo =  await Todo.create({ title, done });
        if (createTodo) {
            res.json({result:true, ...createTodo.dataValues});
        } else {
            res.json({result:false});
   
        }

    } catch (e) {
        res.json({result:false});

    }

};
const patch_todo = async (req, res) => {


    const { id, title, done } = req.body;

    const update = {   
        title : title,
        done : done,
    }

    try {
         const updateTodo =  await Todo.update(update, {
            where : {id}
         });
        if (updateTodo) {
            res.json({result:true});
         
        } else {
            res.json({result:false});
    
        }

    } catch (e) {
        res.json({result:false});
    }

};
const delete_todo = async (req, res) => {

    const {todoId:id} = req.params;

    try {
         const delTodo =  await Todo.destroy({
            where : {id}
         });
        if (delTodo) {
            res.json({result:true});
        } else {
            res.json({result:false});
        }

    } catch (e) {
        console.log('e',e)
        res.json({result:false});
    
    }

};

module.exports = { get_todo, post_todo, patch_todo, delete_todo };
