//Our modules
const fs = require('fs');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);
  if(id > tours.length) {
    return res.status(400).json({
      status: "failed",
      message: "INVALID ID"
    })
  }
  let tour;
  console.log(id)
    tours.forEach(element => {
    if(element.id === id) {
      tour = element;
    }
    return tour;
  });

  console.log(tour)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    },
  });
});

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('You can eat oo');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length-1].id + 1;
  console.log(req.body)
  const newTour = Object.assign({ id: newId}, req.body)

  tours.push(newTour)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    })
  })
});

// app.patch('/api/v1/tours/:id', (req,res)=>{

// })