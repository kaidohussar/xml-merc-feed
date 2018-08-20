const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send({
    message: 'Utime testproject',
    apikey: 'fBTO10HviuF3qhsfEMqKmuk7iDSL3uNdoktFCi86'
  });
});

//if my heroku or some other forces a port then a, else b
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log('im listening');
});
