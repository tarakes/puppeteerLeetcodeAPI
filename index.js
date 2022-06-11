const express=require('express');
const app=express();
const puppeteer = require('puppeteer');
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.post('/',async (req,res)=>{
    if(!req.body.contest)
    res.sendStatus(404);
try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  await page.goto(`https://leetcode.com`);
   setTimeout(async () => {
    try {
        const contestid=req.body.contest;
        const pageno=req.body.page;
        const myarr= await  page.evaluate((contest,page) => {
          /*  const myhtml=document.querySelectorAll(".table-striped")[0].rows;
            const len=myhtml.length;
            var arr=[];
            //console.log(myhtml,myhtml.length);
            for(var i=1;i<len;i++)
            arr.push({
                username:myhtml[i].cells[1].innerText,
                rank:myhtml[i].cells[0].innerText,
                score:myhtml[i].cells[2].innerText,
                finishtime:myhtml[i].cells[3].innerText
             }) 
             return arr;*/
            
           const arr=  fetch(`https://leetcode.com/contest/api/ranking/${contest}/?pagination=${page}&region=global`)
             .then(res=> res.json())
             .then(data=>{return data;})
             .catch((err)=>console.log(err))
             return arr;
                    },contestid,pageno); 
                    res.send({data:myarr});   
    } catch (error) {
        console.log(error);
       res.sendStatus(404);  
    }
   
        //console.log(myhtml);
  }, 2000);

   } catch (error) {
    console.log(error);
    res.sendStatus(404);
   }
})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log("server is listening....");
})
