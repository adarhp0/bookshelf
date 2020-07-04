const fetch=require('node-fetch')
const request=require('request')
const xml2js=require('xml2js')


var book_data=Object();
function gr_api(title){
  console.log("hey",title)
  console.log(typeof title)
  request.get('https://www.goodreads.com/book/title.xml?key=5o1DiBvZcyZCbDBaczXRTg&title='+title, function (error, response, body) {
      //console.error('error:', error); // Print the error if one occurred
      
      xml2js.parseString(body,async function(err,result){


          let a=await result["GoodreadsResponse"]["book"]["0"]
          //console.log(Object.keys(a))
          book_data.num_pages=a["num_pages"]["0"]
          book_data.description=a["description"]["0"];
          book_data.total_rating=a["work"][0]["rating_dist"]["0"]
          book_data.average_rating=a["average_rating"]["0"]
          book_data.author=a["authors"][0]["author"][0]["name"]["0"]
          
          
          console.log("hey",book_data)
      })
      
      
    })
}

let gapi=async ()=>{
let url="https://www.googleapis.com/books/v1/volumes?q=you+cant+hurt+me";
let settings={method:"Get"}
fetch(url,settings).then(res=>res.json())
.then((json)=>{
  let a =json["items"]["0"]['volumeInfo']
  var t1=a['title']
  var title=t1.split(' ').join('+')
  book_data.previewLink=a["previewLink"]
  book_data.imageLinks=a['imageLinks']['thumbnail']

  
  book_data.title=title
return(title);

}).then((t)=>gr_api(t))

}
gapi();