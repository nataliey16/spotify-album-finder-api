import "./App.css";
import imgStar from "/svg/star.png";
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]); // Will hold an array of information, initialize here

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
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // Get Artist
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    //Get Artist Albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

  return (
    <>
      <Container>
        {/* <h1 style={{ fontFamily: "Bungee Shade", fontSize: "30px" }}> */}
        <h1
          style={{
            fontSize: "72px",
            fontFamily: "NormandyBeach",
            color: "black",
          }}
        >
          Discover your
          <br />
          {/* <img src={imgStar} alt="image of star" width={40} height={50} /> */}
          🎶 favourite soundtracks 🎶
        </h1>
        <InputGroup>
          <FormControl
            placeholder="Search an Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              fontFamily: "Montserrat",
              width: "300px",
              height: "35px",
              border: "2px solid black",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />

          <Button
            className="search-button"
            style={{
              fontFamily: "Montserrat",
              background: "#e4e18d",
              padding: "8px 22px",
              borderRadius: "3px",
              boxShadow: "4px 4px black", // Solid line box shadow
            }}
            onClick={search}
          >
            Discover
          </Button>
        </InputGroup>
      </Container>

      <Container>
        <Row
          style={{
            fontFamily: "Montserrat",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {albums.map((album) => {
            return (
              <Card
                key={album.id}
                style={{
                  // backgroundColor: "white",
                  margin: "40px 0px",
                  border: "2px solid black",
                  borderRadius: "5px",
                  boxShadow: "4px 4px black", // Solid line box shadow
                  marginBottom: "30px",
                }}
              >
                <Card.Img
                  width={200}
                  src={album.images[0].url}
                  style={{ borderRadius: "4%" }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "200px",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "#282818",
                    }}
                  >
                    {album.name}
                  </Card.Title>
                  <Card.Text style={{ color: "#282818" }}>
                    Release Date: <br />
                    {album.release_date}
                  </Card.Text>
                  <Button
                    className="view-album-button"
                    href={album.external_urls.spotify}
                    style={{
                      backgroundColor: "#c4d8d1",
                      borderRadius: "3px",
                      color: "#282818",
                      fontSize: "15px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      border: "1px solid black",
                      boxShadow: "4px 4px black", // Solid line box shadow
                    }}
                    target="_blank"
                  >
                    View Album
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default App;
