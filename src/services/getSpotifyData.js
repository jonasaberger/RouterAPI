const getSpotifyData = async (search_input, search_type, access_token) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${search_input}&type=${search_type}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
}
export default getSpotifyData