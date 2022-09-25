const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

exports.checkID = (req,res,next,val) => {
  console.log(`Tour id is: ${val}`)
  if (req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'fail',
      message: "INVALID ID"
    })
   }
   next()
}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  }
  
  exports.getTour = (req, res) => {
    const id = Number(req.params.id);
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
  
  exports.createTour = (req, res) => {
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
  
  exports.updateTour = (req,res)=>{ 
    res.status(200).json({
     status: "success",
     data: {
       tour: "<updated tour here ....>"
     }
    })
   }
  
   exports.deleteTour =  (req,res)=>{
    res.status(204).json({
     status: "success",
     data: null
    })
   }
