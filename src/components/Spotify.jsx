import React, { useState } from "react";
import getAccessToken from "../services/getAccessToken";
import getSpotifyData from "../services/getSpotifyData";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider'


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

  const [refreshCounter, setRefreshCounter] = useState(0);

  const searchButton = (event) => {
    event.preventDefault()
    setRefreshCounter(0)
    handleSearch()
  }

  const wrongButton = (event) => {
    event.preventDefault()
    setRefreshCounter(refreshCounter+1)
    console.log(refreshCounter)
    handleSearch()
  }

  // Handle the entire search operation
  const handleSearch = async () => {
    console.log("-- START-SEARCH --");
    console.log("q = " + searchInput);
    console.log("category = " + category);
    await fetchAccessToken(); // Wait for access token
    await fetchData(); // Wait for data
    console.log("-- END-SEARCH --");
  };

  // Get the Data from the search input
const fetchData = async () => {
    try {
      const fetchedData = await getSpotifyData(searchInput, category, accessToken);
      setData(fetchedData);
      console.log(fetchedData)
      formatData(fetchedData); // Call formatData after setting data
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  // Format the data so that it can be outputted
  const formatData = (data) => {
    if (category === 'album') {
      let albumData = data.albums.items[0+refreshCounter]
      setOutputData(
        <>
          <h1 className="AlbumName"><b>{albumData.name}</b></h1>
          <div>{(albumData.artists).map((artist) => (
            <h3>{artist.name}</h3>
          ))}</div>
          <img className="AlbumImage" src={albumData.images[1].url} alt="Album"/>
          <Button
                variant="dark"
                onClick={openLink(albumData.external_urls.spotify)}
                disabled={checkedIndex === null || searchInput === ''}>Open Link</Button>
          <b>{albumData.release_date}</b>
          <p>Tracks: {albumData.total_tracks} | Type: {albumData.type}</p>
          
          
        </>
      );
    } 
    else if (category === 'artist') {
      let artistData = data.artists.items[0+refreshCounter];
      setOutputData(
        <>
          <h1 className="ArtistName">{artistData.name}</h1>
          <img className="ArtistImage" src={artistData.images[1].url} alt="Artist" />
          <i className="FollowerCount">{formatNumberWithDots(artistData.followers.total)} Followers</i>
          <ul className="GenreList">{(artistData.genres).map((label,index) => (
            <li>{label}</li>
          ))}</ul>
          <Button
                variant="dark"
                onClick={openLink(artistData.external_urls.spotify)}
                disabled={checkedIndex === null || searchInput === ''}>Open Link</Button>
          <b>Popularity Score</b>
          <RangeSlider
            value={artistData.popularity}
            variant="dark"
            />
        </>
      );
    }
    else if (category === 'track') {
    let trackData = data.tracks
      setOutputData(
        <>
            <b>Total Results:: {trackData.total}</b>
            <div>{(trackData.items).map((track) => (
                <>
                <h5>
                    <Button
                    variant="dark"
                    onClick={openLink(track.external_urls.spotify)}
                    disabled={checkedIndex === null || searchInput === ''}> </Button> {track.name} : {formatMsToMinutes(track.duration_ms)}</h5>
                    <div>{(track.artists).map((artist) => (
                        <p>- {artist.name}</p>
                    ))}</div>
                </>
            ))}</div>
        </>
      );
    }
  };
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


  const formatNumberWithDots = (number) => {
    let numberStr = number.toString().split('');
    let formattedNumber = '';
    let digitCount = 0;
  
    for (let i = numberStr.length - 1; i >= 0; i--) {
      formattedNumber = numberStr[i] + formattedNumber;
      digitCount++;
  
      if (digitCount % 3 === 0 && i !== 0) {
        formattedNumber = '.' + formattedNumber;
      }
    }
  
    return formattedNumber;
  };

  const formatMsToMinutes = (ms) => {
    let seconds = ms / 1000;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zeros if needed
    let formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
    let formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    return formattedMinutes + ':' + formattedSeconds;
};

  const openLink = (url) => {
    return (event) => {
        event.preventDefault();

        // Open the link in a new tab
        window.open(url);
    }
};
  return (
    <div className="SpotifyContainer">
      <h2 className="SpotifyTitle">Spotify</h2>
      <Form>
        <Form.Group controlId="searchInput">
          <Form.Control
            type="text"
            placeholder="Enter search input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="SpotifyCheckboxContainer">
            {['Album', 'Artist', 'Track'].map((label, index) => (
            <Form.Check
                key={index}
                type="checkbox"
                label={label}
                checked={checkedIndex === index}
                onChange={() => handleCheckboxChange(index)}
            />
            
            ))}
        </Form.Group>
      </Form>
      <Button
        variant="dark"
        onClick={searchButton}
        disabled={checkedIndex === null || searchInput === ''}
      >
        Search
      </Button>
      {outputData && <div className="SpotifyDataContainer">{outputData}</div>}
      <Button
        variant="light"
        onClick={wrongButton}
        disabled={outputData === null || refreshCounter >= 20}
      >
        Wrong One?
      </Button>
    </div>
  );
};

export default Spotify;
