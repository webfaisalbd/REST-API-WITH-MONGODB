const app = require('./app');

const PORT = 4000;

app.listen(PORT, ()=>{
    console.log(`app is running at http://localhost:${PORT}`);
})