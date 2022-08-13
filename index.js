const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const{v4: uuid} = require('uuid');

app.use(methodOverride('_method'));
app.use(express.urlencoded({express: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Hey! I liked your post.'
    },
    {
        id: uuid(),
        username: 'Max',
        comment: 'I did\'nt liked your post!'
    },
    {
        id: uuid(),
        username: 'Williams',
        comment: 'please delete your post.'
    },
    {
        id: uuid(),
        username: 'Shakes',
        comment: 'that is funny'
    }
]

app.get('/comments', (req, res)=>{
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res)=>{
    res.render('comments/new');
})
app.post('/comments',(req, res)=>{
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
})
app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find( c => c.id === id);
    res.render('comments/show', {comment})
})
app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find( c => c.id === id);
    res.render('comments/edit', {comment});

})
app.patch('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const newcomment = req.body.comment;
    const foundcomment = comments.find( c => c.id === id);
    foundcomment.comment = newcomment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    comments = comments.filter((c) =>{
        c.id !== id;
    } )
    res.redirect('/comments/');
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})


