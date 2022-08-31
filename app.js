// getting modules 
const Joi = require('joi');
const express = require('express');
const app = express();
const db = require("./connection");
// getting express json because by default its doesnt work.
// implimented a middleware to get it accommodate the needed feature of json conversion
app.use(express.json());

// app.use(express.urlencoded());

// methods which are having from obj of app 

// app.get()
// app.post()
// app.put()
// app.delete()

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
    {id: 4, name: 'course 4'},
    {id: 5, name: 'course 5'}
];
const errorResponse =[
    {code: 404, message: 'Course with given id not found'}
];

// GET request handling 

// root 
app.get('/',(req,res)=>{

    // use to send the data to user from server
    res.send('hey gaurav !!!');
});

// with endpoints
app.get('/api/courses', (req, res) =>{
    db.query(('SELECT * FROM courses'),(err, rows,fields)=>{
if(!err){
    res.send(rows);
}else{
    res.status(404).send(errorResponse);
}
    });
// res.send(courses);
});

app.get(`/api/courses/:id`, (req, res)=>{

    db.query((`SELECT * FROM courses WHERE id = ${parseInt(req.params.id)}`),(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            res.status(404).send(JSON.stringify(err,undefined,2));
        } 
    });
//     const course = courses.find(c=> c.id === parseInt(req.params.id));

//     // const course = courses.find(c=> c.id === parseInt(req.params.id));
//   if(!course) return res.status(404).send(errorResponse);
//     res.send(course);
});

// end of GET request handling.
//=================================

// POST request handling 

// with endpoints
app.post('/api/courses', (req,res) => {

     // const result = Joi.ValidationError(req.body, schema);
    //  const result = validateData(req.body);
     // by obj destructure 
     const { error } = validateData(req.body);


if(error) return res.status(404).send(error.details[0].message);
  

// const course ={
//     id: courses.length+1,
//     name: req.body.name
// };



// // pushes the data to the list
// courses.push(course);
// //response sends to user 
// res.send(course);

// db insert work
// INSERT INTO `Demo`.`courses` (`name`) VALUES ('new ')
db.query((`INSERT INTO courses (name) VALUES (' ${req.body.name} ')`),(err,rows,fields)=>{
if(!err && !error){
    res.send(fields);
}else{
    res.status(404).send(JSON.stringify(err,undefined,2));
}
});

});
// end of POST request handling.
//=================================



// PUT request handling 

app.put('/api/courses/:id',(req, res)=>{
    // search and give errror
    // validate 
    // update document

    // const course = courses.find(c=> c.id === parseInt(req.params.id));
    // if(!course) return res.status(404).send(errorResponse);


    //  // const result = Joi.ValidationError(req.body, schema);
    // //  const result = validateData(req.body);
    //  // by obj destructure 
    //  const {error} = validateData(req.body);

    //  if(error) return res.status(404).send(error.details[0].message);
     
    //  course.name = req.body.name;
    //  res.send(course);
    // UPDATE table_name
    // SET column1 = value1, column2 = value2, ...
    // WHERE condition;
     db.query((`UPDATE courses SET name = '${req.body.name}' where id = '${parseInt(req.params.id)}'`),(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            res.status(400).send(JSON.stringify(err,undefined,2));
        }
     });

});

// end of PUT request handling.
//=================================



function validateData(course){
    const schema = {
        name: Joi.string().min(5).required()
     };
     
     // const result = Joi.validate(req.body, schema);
   return Joi.validate(course, schema);
}


// DELETE request handling 

app.delete('/api/courses/:id', (req,res)=>{
    // look up the course
    // not existing, return 404

    // const course = courses.find(c=> c.id === parseInt(req.params.id));
    // if(!course) return res.status(404).send(errorResponse);

    // // delete

    // const index = courses.indexOf(course);
    // // courses.delete(index);
    // courses.splice(index,1);
    // res.send(course);
    // // return the same course

    // db table row delete 
    // DELETE FROM table_name WHERE condition;

    db.query((`DELETE FROM courses WHERE id = '${parseInt(req.params.id)}'`),(err,rows, fields)=>{

        if(!err){
            res.status(200).send(rows);
        }else{
            res.status(400).send(err);
        }

    });

});


// Implement a environment variable to access dynamic ports
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Lisening on http://localhost:${port}`)); 