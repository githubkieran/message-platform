const express = require('express');
const app = express();
const port = 5000; 
const path = require ('path');

//app.METHOD(path, handler)
app.get('/', (req, res) => {
    res.send("We are live!");
});

/*
Create - POST
Read - GET
Update - PUT
Delete - DELETE
*/

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
