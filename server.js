//require
const express = require('express');
const fs = require('fs');
//uses the files present in folder public
const app = express();
app.use(express.static('public'));
//sets max JSON get request size
app.use(
  express.json({
    limit:'1kb',
    type:'application/json'
  })
);
//post request by site
app.post('/apiMulti', async (request,responce)=>{
  const dataGot = request.body;
  dataGot.moreDays = parseFloat(dataGot.moreDays);
  dataGot.day = parseFloat(dataGot.day);
  console.log(dataGot);
  let imageList = []
  for(let i = dataGot.day; i <= dataGot.moreDays + dataGot.day; i++){//change for your parsed data location
    if(!fs.existsSync(`F:/imagesTrain/${dataGot.day + i}.png`)) continue;
    imageList.push(`F:/imagesTrain/${dataGot.day + i}.png`)
  }
  for(let i = 0; i < imageList.length; i++ ) {
    fs.copyFileSync(imageList[i],`./public/${i}.png`);
  }
  console.log(imageList);
  responce.send(JSON.stringify({sent:"ok"}));
});
app.get('/delete',(request,responce)=>{
  console.log("deleating");
  x = fs.readdirSync('./public', {withFileTypes:true }).filter(item => !item.isDirectory()).map(item => item.name)
  x.map(e => {
    let a = e.split(".").reverse();
    a.pop()
    if(a == 'png') fs.unlinkSync("./public/"+e)
  });
  console.log("deleted");
})
//start app
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
