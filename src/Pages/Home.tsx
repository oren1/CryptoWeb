import grapqlImage from "../graphql-reasons.png";
import app from "../app.png";
import website from "../website.png";
import listCrypto from "../cryptoapp.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home-App">
      <header className="Home-App-header">
        <h1>Oren Shalev</h1>
        <h4>Software Engineer</h4>
        <div className="projects-container">
          <div className="project">
            <a href="https://apps.apple.com/il/app/crypto-tracker-alert-chain/id1575176418">
              <img src={app} alt="Cinque Terre" />
            </a>
            <div className="desc">Crypto Tracking App</div>
          </div>
          <div className="project">
            <Link to="/CryptoWebsitePage">
              <img src={website} alt="Cinque Terre" />
            </Link>
            <div className="desc">Crypto Website with React.js</div>
          </div>
          <div className="project">
            <Link to="/VideoPlayer">
              <img src={listCrypto} alt="Cinque Terre" />
            </Link>
            <div className="desc">
              Cross Platform Crypto App with React Native
            </div>
          </div>
          <div className="project">
            <a href="https://5142s291u6.execute-api.us-east-1.amazonaws.com/">
              <img src={grapqlImage} alt="Cinque Terre" />
            </a>
            <div className="desc">Graph QL server with Apollo</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
