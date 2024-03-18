import "./App.css";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  //useEffect hook to fetch an access token from Spotify API using client credentials authentication
  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };
    //fetch - built in JavaScript functin used to make HTTP requests
    //takes two parameters
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);
  //This returns a Promise - allowing us to use our access token for our search function
  return (
    <>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search for Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={{}} // search function
            onChange={{}} // setSearch
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />
          <Button onClick={{}}>Search</Button>
        </InputGroup>
      </Container>
    </>
  );
}

export default App;
