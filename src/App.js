import React from 'react';
import './App.css';
const albumAPI = 'https://jsonplaceholder.typicode.com/albums';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumCategories: [],
      selectedCategorieId: 1,
      photos: []
    }
    this.changeSelectedCategorie = this.changeSelectedCategorie.bind(this);
  }
  componentDidMount() {
    fetch(albumAPI)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          albumCategories: data
        })
      })
      .then(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.state.selectedCategorieId}`)
          .then(response => response.json())
          .then(data => {
            this.setState({ photos: data }, () => {
              console.log(this.state.photos)
            })
          })
      })
  }
  changeSelectedCategorie(e) {
    const { value } = e.target;
    console.log(value);
    this.setState({ selectedCategorieId: value });
  }
  render() {
    return (
      <div className="App">
        <h1>Select an album:</h1>
        <select onChange={this.changeSelectedCategorie}>
          {this.state.albumCategories.map(categorie => {
            return <option
              key={categorie.id}
              value={categorie.id}>
              {categorie.title}
            </option>
          })}
        </select>
        <div>
          {this.state.photos.map(photo => {
            return <img key={photo.id} src={photo.thumbnailUrl} />
          })}

        </div>

      </div>

    );
  }
}

export default App;
