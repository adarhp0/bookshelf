import React,{useState,useEffect}from 'react';

const Search=()=>{
    const [bdata,setBdata]=useState(Object());
    const [btstate,setBtstate]=useState(false)


    useEffect(()=>{
        fetch('http://localhost:1234/books/cnt hurt me').then(res=>res.json()).then(setBdata)

    },[btstate])
    if(btstate){
        return(
            <div>
                <p>All set</p>
                
             <p>{bdata["previewLink"]}</p>   
              <p>  {bdata["imageLinks"]}</p>
              <p>  {bdata["goog_name"]}</p>
              <img src={bdata["imageLinks"]} />
              <p>  {bdata["title"]}</p>
                <p>{bdata["num_pages"]}</p>
                <p>{bdata["description"]}</p>
                <p>{bdata["total_rating"]}</p>
               <p> {bdata["average_rating"]}</p>
                <p>{bdata["author"]}</p>
            </div>
        )
    }
    else{
return(
    
<div>
   <button onClick={e=>setBtstate(true)}>Search</button>

</div>
)}
}


export default Search;
