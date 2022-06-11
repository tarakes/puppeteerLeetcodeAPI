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
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
   try {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
  await page.goto(`https://leetcode.com`);
   setTimeout(async () => {
    try {
        const contestid=req.body.contest;
        const pageno=req.body.page;
        const myarr= await  page.evaluate((contest,page) => {
           const arr=  fetch(`https://leetcode.com/contest/api/ranking/${contest}/?pagination=${page}&region=global`)
             .then(res=> res.json())
             .then(data=>{return data;})
             .catch((err)=>console.log(err))
             return arr;
                    },contestid,pageno); 
                    res.send({data:myarr});  
                    await browser.close(); 
    } catch (error) {
        console.log(error);
       res.sendStatus(404); 
       await browser.close();  
    }
   
        //console.log(myhtml);
  }, 2000);

   } catch (error) {
    console.log(error);
    res.sendStatus(404);
     browser.close();
   }                         
   } catch (error) {

    console.log(error);
    res.sendStatus(404);
    
   }
})

app.listen(process.env.PORT || 4000 ,()=>{
    console.log("server is listening....");
})
