const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geoCode.js')
const foreCast=require('./utils/foreCast.js')
const { response } = require('express')

const app=express()
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')//path.join is used to set the path to a particular file or folder using __dirname as reference mostly
                                                           //__dirname displays the path of current folder we are in 
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setting handlebars
app.set('view engine','hbs')//we are using hbs instead of html pages in order to use template and partial pages
app.set('views',viewsPath)//Node usually looks for views folder to search for hbs pages but we have changed the name of views to templates
//so we need to set the views to path of templates folder so that node can look in templates folder instead of views folder
hbs.registerPartials(partialsPath)//setting up partials using handlebars

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{ //'' indicates that it is default page
    res.render('index',{ //in render function first argument is the name of file and second is the properties we want to pass dynamically to that file
        title:'Weather App',
        name:'Venkatesh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Venkatesh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This page is for the users who are looking for help',
        title:'Help',
        name:'Venkatesh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address using address key'
        })
    }
    geoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        foreCast(longitude,latitude,(error,foreCastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location,
                data:foreCastData,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        textMessage:'Help article not found',
        title:'404',
        name:'Venkatesh'
    })
})

app.get('*',(req,res)=>{
    res.render('errorPage',{
        textMessage:'Page not found',
        title:'404',
        name:'Venkatesh'
    })
})

app.listen(3000,()=>{   
    console.log('Server is up on port 3000')
})
