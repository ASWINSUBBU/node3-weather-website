const path=require('path')
const express =require('express')
const hbs=require('hbs')
const { query } = require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app =express()


const pathDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



app.use(express.static(pathDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Aswin"
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1> Weather</h1>')
// })


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help to create web-application",
        name:"Aswin"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'AboutMe',
        name:' Aswin'
    })
})

app.get('/products',(req,res) =>{
if (!req.query.search){
        return res.send({
        error:'You must provide search term'
    })
}

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather', (req ,res ) => {
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide the address!"
        })
    }

    geocode(req.query.address,(error,{lattitude,longitude,location} ={})=> {
    if (error)
    {
        return res.send({error})
    }


    forecast(lattitude,longitude,(error,forecastData)=>
    {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
    })
})
})

    // res.send({
    //     Find:'Aswin',
    //     location:'Coimbatore',
    //     address:req.query.address
    // })
app.get('/help/*',(req,res)=>
{
    res.render('404',{
        title:'Error',
        name:'Error',
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res)=>
{
    res.render('404',{
        title:'Error',
        name:'Error',
        errorMessage:"Page not found!"

    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})
//app.com
//app.com/help
//app.com//about