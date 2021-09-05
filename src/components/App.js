import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (event) => {
    this.setState({
      filters: {type: event.target.value}
    }, () => console.log(this.state.filters.type))
  }

  handleOnFindPetsClick = () => {
    const url = this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
    fetch(url)
    .then(response => response.json())
    .then(
      json => this.setState({pets: json}, ()=> console.log(json))
      )
  }

  handleOnAdoptPet = (petID) => {
    let pets = [...this.state.pets]
    pets[pets.findIndex((pet)=> pet.id === petID)].isAdopted = true
    this.setState({
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleOnFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleOnAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
