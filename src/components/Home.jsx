import { Button } from "react-bootstrap";

const Home = (props) => {

    const openGithub = () => {
        return (event) => {
            event.preventDefault();
    
            // Open the link in a new tab
            window.open();
        }
    }

    return (
        <div className="HomeContainer">
            <h1>Home</h1>
            <b>This is a prototype of my website.</b>
            <p>For updates which might come in the future (or not) you can visit my github-profile-page:</p>
            <Button
                variant="dark"
                className="HomeGitHub"
                onClick={openGithub}
            >
                GitHub - Jonas Aberger
            </Button>

        </div>
        
    )
}
export default Home;