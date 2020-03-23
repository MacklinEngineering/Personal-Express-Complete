var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function(){
    //send PUT Request Here

    fetch('informationOnBusinesses', {

        //Fetch takes in two parameters. The FIRST parameter is a path. In this case, we’re sending the request to /quote, which will be handled on our server.

        //The SECOND parameter, options, is an optional object that allows you to control a number of different settings. The ones we used above are method, headers and body.
        method: 'put',
        //This Method is set to a PUT REQUEST
        headers: {'Content-Type': 'application/json'},
        //Headers here refers to HTTP Headers you want to send to the server. It is an object with multiple key-value pairs.
        body: JSON.stringify({
            //body refers to the content you send to the server.
            //We’ve also converted the business information (quote) into JSON in the body with JSON.stringify.
            'name': 'Some OTHER BUSINESS',
            'city': 'STILL BOSTON',
            'linkToWebsite': 'SOME OTHER WEBSITE'
        })

    })
    .then(res=>{
        if (res.ok) return res.json()
    })
    .then(data =>{
        console.log(data)
        window.location.reload(true)
    })
})
del.addEventListener('click', function(){
    fetch('informationOnBusinesses', {
        method:'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Some OTHER BUSINESS',
            // 'city': 'STILL BOSTON',
            // 'linkToWebsite': 'SOME OTHER WEBSITE'
        })
    })
    .then(res =>{
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
})
