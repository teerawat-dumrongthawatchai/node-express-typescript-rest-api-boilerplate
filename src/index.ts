import app from './app';
import db from './config/database.config';

db.sync().then(() => console.log('database connected'));

const port = 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
