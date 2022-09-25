//Our modules
const fs = require('fs');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
}

const getTour = (req, res) => {
  const id = Number(req.params.id);
  if(id > tours.length) {
    return res.status(400).json({
      status: "failed",
      message: "INVALID ID"
    })
  }
  let tour;
    tours.forEach(element => {
    if(element.id === id) {
      tour = element;
    }
    return tour;
  });

  res.status(200).json({
    status: 'success',
    data: {
      tour
    },
  });
}

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length-1].id + 1;
  const newTour = Object.assign({ id: newId}, req.body)

  tours.push(newTour)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    })
  })
}

const updateTour = (req,res)=>{
  if (req.params.id * 1 > tours.length){
   return res.status(404).json({
     status: 'fail',
     message: "INVALID ID"
   })
  }
 
  res.status(200).json({
   status: "success",
   data: {
     tour: "<updated tour here ....>"
   }
  })
 }

 const deleteTour =  (req,res)=>{
  if (req.params.id * 1 > tours.length){
   return res.status(404).json({
     status: 'fail',
     message: "INVALID ID"
   })
  }
 
  res.status(204).json({
   status: "success",
   data: null
  })
 }

app.get('/api/v1/tours',getAllTours );
app.get('/api/v1/tours/:id',getTour );
app.post('/api/v1/tours', createTour );
app.patch('/api/v1/tours/:id',updateTour )
app.delete('/api/v1/tours/:id',deleteTour)


app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').patch(updateTour).delete(deleteTour)

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
