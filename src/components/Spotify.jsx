import React, { useState } from "react";
import getAccessToken from "../services/getAccessToken";
import getSpotifyData from "../services/getSpotifyData";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Spotify = () => {
  // Main Variables
  const client_id = '2d54fefb78d84d02a1071afadb9dda9f';
  const client_secret = '9f0fbfeb0d144edf902e13fb668c596e';

  const [accessToken, setAccessToken] = useState(null);
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState(null);

  const [data,setData] = useState(null);
  const [outputData, setOutputData] = useState(null);

//   Handle the entire search operation
  const handleSearch = async () => {
    console.log("-- START-SEARCH --")
    console.log("q = " + searchInput)
    console.log("category = " + category)
    fetchAccessToken()
    fetchData()
    if(data != null) 
        formatData()
    console.log("-- END-SEARCH --")
  }

// Format the data so that it can be outputed
const formatData = () => {
    if(category === 'album') {
        setOutputData(


        )
    }
    else if(category === 'artist') {
        setOutputData(

        )
    }
    else if(category === 'track') {
        setOutputData(

            

        )
    }
}

// Get the Data from the search input
  const fetchData = async () => {
    try {
        const data = await getSpotifyData(searchInput,category,accessToken)
        setData(data)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
  }

//   Gets a AccessToken from the Spotify-API Service
  const fetchAccessToken = async () => {
    try {
      const tokenData = await getAccessToken(client_id, client_secret);
      setAccessToken(tokenData.access_token); // Assuming the token is in access_token property
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

//   Changes the category variable based on the ticked box
  const handleCheckboxChange = async (index) => {
    setCheckedIndex(index);
    let selectedCategory;
    switch(index) {
        case 0: 
          selectedCategory = 'album';
          break;
        case 1: 
          selectedCategory = 'artist';
          break;
        case 2: 
          selectedCategory = 'track';
          break;
        default: 
          selectedCategory = 'album';
          break;
    }
    setCategory(selectedCategory);
    console.log('Selected category:', selectedCategory);
  };

  return (
    <div className="SpotifyContainer">
      <h2 className="SpotifyTitle">Spotify</h2>
      <Form>
        <Form.Group controlId="searchInput">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search query"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
        {['Album', 'Artist', 'Track'].map((label, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            label={label}
            checked={checkedIndex === index}
            onChange={() => handleCheckboxChange(index)}
          />
        ))}
      </Form>
      <Button
        variant="dark"
        onClick={handleSearch}
        disabled={checkedIndex === null || searchInput === ''}
      >
        Search
      </Button>
      {outputData && <div className="SpotifyDataContainer">{outputData}</div>}
    </div>
  );
};

export default Spotify;
