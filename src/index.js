const express = require('express');
//Mongoose connection file
require('./db/mongoose');



//Create the app
const app = express();
const port = process.env.PORT || 3001;
//Automatically parse incoming JSON to an object
app.use(express.json());
//Router files
app.use(require('./routers/project'));
app.use(require('./routers/folder'));
app.use(require('./routers/task'));

//Server up
app.listen(port, () => {
	console.log('Server is up on port ' + port);
})