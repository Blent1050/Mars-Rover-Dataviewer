import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nasaData: {},
      isLoading: true
    };
  }

  componentDidMount() {
    this.getCharacters(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&api_key=nHHB8nphFEXOfoXhanxlDrBJSlo74O29QkCXrsNx"
    );
  }

  getCharacters = URL => {
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ nasaData: data.photos, isLoading: false });
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  Loading = () => {
    return <h1>The Data is loading...</h1>;
  };

  NasaCard = () => {
    return (
      <div>
        <h1>Taken from: {`'${this.state.nasaData[0].rover.name}'`}</h1>
        <p>
          On {this.state.nasaData[0].earth_date} with the{" "}
          {this.state.nasaData[0].camera.full_name}
        </p>
        <img src={this.state.nasaData[0].img_src} />
      </div>
    );
  };
  render() {
    console.log(this.state.nasaData[0]);
    return (
      <div className="App">
        {this.state.isLoading ? this.Loading() : this.NasaCard()}
      </div>
    );
  }
}

export default App;
