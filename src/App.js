import {useState,useEffect} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [listOfFriends,setListOfFriends]=useState([])
  const [name,setName]=useState('')
  const [age,setAge]=useState(0)

 
  
  const addFriend=()=>{
    axios.post('https://mern-begginer.herokuapp.com/create',{
      name:name,
      age:age
    }).then(()=>{
      alert('Yah,worked')
    }).then(()=>{
      setListOfFriends([...listOfFriends,{
        name:name,
        age:age
      }])
    }).catch(()=>{
      alert('Not worked')
    })
  }

  useEffect(()=>{
    axios.get('https://mern-begginer.herokuapp.com/read').then((response)=>{
      setListOfFriends(response.data)
    }).catch(()=>{
      console.log('err')
    })
  },[])

  

  const updateFriend=(id)=>{
    const newAge=prompt('Enter new Age:')
    axios.put('https://mern-begginer.herokuapp.com/update',{
    newAge:newAge,
    id:id
  }).then(()=>{
    setListOfFriends(listOfFriends.map((val)=>{
      return val._id===id ? {_id:id, name:val.name, age:newAge}:val;
    }))
  })
  }


  const deleteFriend=(id)=>{
    axios.delete(`https://mern-begginer.herokuapp.com/delete/${id}`).then(()=>{
      setListOfFriends(listOfFriends.filter((val)=>{
        return val._id !==id;
      }))
    })
  }
  // const clearInputs=()=>{
  //   name.value=''
  //  age.value=''
  // }
  return (
    <div className="App">
     <div className="inputs">
       <input type="text" placeholder='friend name...' 
        onChange={(event)=>{setName(event.target.value)}}
       />
       <input type="number" placeholder='friend age...' 
        onChange={(event)=>{setAge(event.target.value)}}
       />
       <button onClick={addFriend}>Add friend</button>

     </div>

     <div className='listOfFriends'>
     {listOfFriends.map((val)=>{
       return(
         <div className='friendContainer'>
         <div className='friend'>
           <h3>Name: {val.name}</h3>
           <h3>Age: {val.age}</h3>
           </div>
           <button id='UpdateBtn' onClick={()=>{updateFriend(val._id)}}>Update</button>
           <button id='removeBtn' onClick={()=>{deleteFriend(val._id)}}>X</button>
         </div>
         
       ) 
     })}
     </div>
    </div>
  );
}

export default App;
