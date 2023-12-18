import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  
  const [pets, newPets] = useState([])

useEffect(() => {
  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/pets')
      newPets(response)
    } catch (error) {
      console.error('Error grabbing data')
    }
  }
  fetchPets()
}, [])

  return (
    <div>
      <h1>My Petshop</h1>
      {
        pets.map((pet) => (
          <li key={pet.id}>
            <p>Pet name: {pet.name}</p>
          </li>
        ))
      }
    </div>
  )
}

export default App
