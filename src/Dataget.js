import React,{useState,useEffect}from 'react';
import './Datar.css'
const Dataget=()=>{
    const [bdata,setBdata]=useState(Object());
    const [btstate,setBtstate]=useState(false);
    const [book_name,setBname]=useState('');
    const [bn,setBn]=useState('');


    useEffect(()=>{
        if(book_name!=='')
        {fetch('http://localhost:5678/books/'+book_name).then(res=>res.json()).then(setBdata)
    setBtstate(true)    
    setBname('')
    setBn('')
    }

    },[book_name])




    if(btstate){
        return(
            <div>
                <form
   onSubmit={e=>{e.preventDefault()
setBname(bn)
}}
   >
<input type="Search" value={bn} onChange={e=>setBn(e.target.value)}></input>
<button type="submit">submit</button>
   </form>
               
               
                <div className="dimg" >
                <img style={{width:"100%",height:"450px"}} src={bdata["imageLinks"]} alt={book_name}/>
                </div>

                <div className="info">
                <a href={bdata["previewLink"]}> Preview Link</a>
                
              <p>  {bdata["imageLinks"]}</p>
              <p>  {bdata["goog_name"]}</p>
              <p>  {bdata["title"]}</p>
                <p>{bdata["num_pages"]}</p>
                <p>{bdata["description"]}</p>
                <p>{bdata["total_rating"]}</p>
               <p> {bdata["average_rating"]}</p>
                <p>{bdata["author"]}</p>
                </div>

            </div>
        )
    }
    else{
return(
    
<div>
   <form
   onSubmit={e=>{e.preventDefault();
      
setBname(bn)
}}
   >
<input type="Search" value={bn} onChange={e=>setBn(e.target.value)}></input>
<button type="submit">submit</button>
   </form>

</div>
)}
}


export default Dataget;
