
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var db


MongoClient.connect('mongodb+srv://MacklinEngineeringFirstApp:BWITSH2know!@firstappcluster-itoqf.azure.mongodb.net/test?retryWrites=true&w=majority', (err, client) =>
{
    if (err) return console.log(err)
    db = client.db('WhatBusinessesAreOpenDuringCOVID19')
    app.listen(4000, function(){
        console.log('listening on 4000')
        })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('/public'))
app.use(bodyParser.json())
//urlencoded (within bodyParser) TELLS body-parser to extract data from the <form> element and add them to the body property in the request object

// app.listen(4000, function(){
// console.log('listening on 4000')
// })

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + '/index.html')
// })

app.get('/', (req, res) =>{
    // var cursor = db.collection('informationOnBusinesses').find()
    // console.log(cursor)

    //The find method returns a cursor (a Mongo object) that probably doesn’t make sense if you console.log it out.

    //This cursor object contains all informationOnBusinesses from our database. It also contains a bunch of other properties and methods that allow us to work with data easily.

    // db.collection('informationOnBusinesses').find().toArray(function(err, results) {
    //     console.log(results)

    //     //allows you to see an array of informationOnBusinesses in the console.log
    // })

    db.collection('informationOnBusinesses').find().toArray((err, result)=> {
        if (err) return console.log(err)
        //renders index.ejs
        res.render('index.ejs', {informationOnBusinesses: result})
    })

})

app.post('/informationOnBusinesses', (req, res) => {
    db.collection('informationOnBusinesses').insertOne(req.body, (err, result) =>{
        if(err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })


    // console.log(req.body)
})

// app.set('view engine', 'ejs')
    //Once the view engine is set, we can begin generating the HTML with our informationOnBusinesses. This process is also called rendering.

// res.render(view, locals)

    //The first parameter, view, is the name of the file we’re rendering. This file must be placed within a views folder.

    //The second parameter, locals, is an object that passes data into the view.
app.put('/informationOnBusinesses', (req, res) =>{
    //handle put request
    db.collection('informationOnBusinesses').findOneAndUpdate(

        {name: "Some OTHER BUSINESS"},{
            $set: {
                name: req.body.name,
                city: req.body.city,
                linkToWebsite: req.body.linkToWebsite
            }

        }, {
            sort: {_id: -1},
            upsert: true
        }, (err, result)=>{
            if (err) return res.send(err)
            res.send(result)
        }

    )
        //SUMMARY OF THE ABOVE: Now, whenever someone clicks on the update button, the browser will send a PUT request through Fetch to our Express server. Then, the server responds by sending the changed quote back to fetch. We can then handle the response within by chaining fetch with a then method. This is possible because Fetch returns a Promise object.


    })

app.delete('/informationOnBusinesses', (req, res) =>{
   //handle delete event here
   db.collections('informationOnBusinesses').findOneAndDelete({
     name: req.body.name},
     (err, result) =>{
       if (err) return res.send(500, err)
       res.send({messagge: "Sorry, Information Was Deleted"})
     })
})



    //Below is the order which to format this method
        // 1. query,
        // 2. update,
        // 3. options,
        // 4. callback

        //1. QUERY allows us to filter the collection through key-value pairs given to it. We can filter the quotes collection for Master Yoda’s quotes by setting the name to Yoda.
            //{name: 'Yoda'}
        //2. UPDATE tells MongoDB what to do with the update request. It uses MongoDB’s update operators like $set, $inc and $push. We will use the $set operator since we’re changing Yoda’s quotes into Darth Vadar’s quotes:
            /*

            {
                $set: {
                name: req.body.name,
                quote: req.body.quote
                }
            }

            */
        //3. OPTIONS is an optional parameter that allows you to define additional stuff. Since we’re looking for the last quote by Yoda, we will set sort within options to {_id: -1}. This allows MongoDB to search through the database, starting from the newest entry.
            /*

            {
                sort: {_id:-1}
            }

            */
                //There’s a possibility that there aren’t any quotes by Master Yoda in our database. MongoDB does nothing by default when this happens. We can force it to create a new entry if we set the upsert option, which means insert (or save) if no entries are found, to true:

                /*

                {
                    sort: {_id: -1},
                    upsert: true
                }

                */
        //4. CALLBACK allows you to do something once MongoDB has replaced the final quote by Yoda with a quote by Darth Vadar. In this case, we can send the results back to the fetch request.

        //ALL CODE TOGETHER
