import React, {useState} from 'react';
import './App.css';

function App() {

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);


  /*Function for adding list item.*/
  function addItem() {

    /*Alert when input box is empty*/
    if(!newItem){
      alert("Enter an item.");
      return;
    }
    
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem

    };

    setItems(oldlist => [...oldlist, item]);

    /*Empties input box when new list item is entered*/
    setNewItem("");


  }
  /*Function for deleting list item.*/
  function deleteItem(id) {

    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }



  return (
    
    <div className="App">
      {/*Title*/}
     <h1>To-do List App</h1>
    
    {/*Input text box*/}
    <input
    type="text"
    placeholder='Add an item...'
    value={newItem}
    onChange={e => setNewItem(e.target.value)}
    />
    {/*Add Button*/}
    <button className='addButton' onClick={() => addItem()}>Add</button>

      {/*List box*/}
      <ul>
        {/*List Items (Name, Delete button, Checkbox)*/}
        {items.map(item =>{
          return(
             <li key={item.id}>{item.value}  
             <button className='delete-button' onClick={() => deleteItem(item.id)} active>X</button>
             <label class="container"><input type="checkbox" onclick="myFunction()"/><span className="checkmark"></span></label>          
             </li>
          )
        })}
      </ul>

    </div>
  );
}

export default App;
