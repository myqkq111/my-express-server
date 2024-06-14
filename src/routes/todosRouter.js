import express from 'express';
import passport from 'passport';
import Todo from '../models/Todo.js';

const router = express.Router();

// 로그인한 유저의 todolist CRUD 구현
// 로그인 하지 않은 경우 접근 권한 x

router.get('/', async (req, res) => {
    try{
        const todos = await Todo.find({ userId : req.user._id });
        return res.json(todos);
    } catch(err){
        return res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try{
        const { body : { title, description }} = req;
        
         const userId = req.user._id;
        const newTodo = new Todo({ title, description, userId });
        const save = await newTodo.save(); 
        return res.status(200).json(save);
    } catch(err){
        return res.status(500).send('Internal server error');
    }

}); 

router.put('/:id', async (req, res) => {
    try{
        const { body : {title, description, completed, dueDate}, params : {id}} = req;
        // const sel = await Todo.findOne(id);
        // if(!sel){
        //     return res.status(401).send('일치하는 fileds가 없습니다');
        // }
        // if(sel.userId != req.user.userId){
        //     return res.status(401).send('일치하는 documents가 없습니다');
        // }
        const upd = await Todo.findByIdAndUpdate(id, {title, description, completed, dueDate});
        return res.status(200).json(upd);
    } catch(err) {
        return res.status(500).send('Internal server error');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const { params : {id} } = req;
        const sel = await Todo.findOne({ _id : id });
        if(!sel){
            return res.status(401).send('일치하는 Todo가 없다');
        }
        await Todo.deleteOne({ _id : id });
        return res.status(200).send('삭제 완료');
    } catch(err){
        return res.status(500).send('Internal server error');
    }
});


export default router; 