const mongoose = require('mongoose');
const app = require('./app');

const DB = 'mongodb://localhost:27017/natours';

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err=>{
    console.log("not connected ",err);
  })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
