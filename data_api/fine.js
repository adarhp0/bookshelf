const request=require('request')
const xml2js=require('xml2js')

function gr_api(){
    
    request.get('https://www.goodreads.com/book/title.xml?key=5o1DiBvZcyZCbDBaczXRTg&title=u+cant+hurt+me', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); 
        xml2js.parseString(body,async function(err,result){
//console.log(result)

            let a=await result["GoodreadsResponse"]["book"]["0"]
            console.log(Object.keys(a))
            
            console.log(a)
            console.log(a["work"][0]["rating_dist"])
            console.log(a["average_rating"])
            console.log(a["authors"][0]["author"][0]["name"])
            console.log(a["description"])
        })
        
        
      })
}
gr_api();

