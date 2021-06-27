import Express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from "path";
const app = new Express();
const port = process.env.PORT || 5000;
import Routers from './controllers/router';

app.use(bodyParser.json());
app.use('/dist', Express.static(path.join(__dirname, '/../dist')));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/* Import router list */
app.use(Routers());

app.listen(port, () => {
   console.table({port});
});
