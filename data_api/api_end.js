const ap=require('express')
const fetch=require('node-fetch')
const request=require('request')
const xml2js=require('xml2js')

const app=ap()
app.get('/books/:name',(req,res)=>{

    var book_data=Object();
    function gr_api(title){
        console.log("hey",title)
        console.log(typeof title)
        request.get('https://www.goodreads.com/book/title.xml?key=5o1DiBvZcyZCbDBaczXRTg&title='+title, function (error, response, body) {
          
          //console.error('error:', error); // Print the error if one occurred
            xml2js.parseString(body,async function(err,result){
                //console.log(result)  
              let a=await result["GoodreadsResponse"]["book"]["0"]
                //console.log(Object.keys(a))
                book_data.title=a["title"]["0"]
                book_data.num_pages=a["num_pages"]["0"]
                book_data.description=a["description"]["0"];
                book_data.total_rating=a["work"][0]["rating_dist"]["0"]
                book_data.average_rating=a["average_rating"]["0"]
                book_data.author=a["authors"][0]["author"][0]["name"]["0"]
                //console.log("goodread",book_data)
                gapi(book_data["title"])
              })
            
    
          })
          
          
      }

      function gapi(n){
      //console.log("book name",n)
        let url="https://www.googleapis.com/books/v1/volumes?q="+n;
        let settings={method:"Get"}
        fetch(url,settings).then(res=>res.json())
        .then((json)=>{
          //console.log(json)
          let a =json["items"]["0"]['volumeInfo']
          var t1=a['title']
          var title=t1.split(' ').join('+')
          
          book_data.previewLink=a["previewLink"]
          book_data.imageLinks=a['imageLinks']['thumbnail']
        
          book_data.goog_name=title
          

          console.log("hey",book_data)
          //console.log("heyey",n1)
          res.send(book_data)
        })
        
        }


        var n=req.params.name;
        var n1=n.split(' ').join('+')
        gr_api(n1);



})
app.get('/bd/:id',(req,res)=>{
    var z=req.params.id;
    
    res.send({input:z})
})
app.listen(5678)