import './App.css';

import { GitHub, LinkedIn } from '@material-ui/icons'
import { Button, Typography } from '@material-ui/core';

function App() {

  const openLink = url => {
    window.open(url, '_blank');
  }


  return (
    <div className="app">
      <div className="content-wrap">
        <img width="100" id="profile-pic" src="me_irl.png" alt="Me in real life" />

        <div className="about-wrap">  
          <Typography variant="h4">
          Sean Boult
          </Typography>
          <Typography variant="body2">
            I like to build things
          </Typography>
        </div>

        <div className="social-wrap">
          <Button onClick={() => openLink('https://github.com/Hacksore')}>
            <GitHub />
          </Button>
          <Button onClick={() => openLink('https://www.linkedin.com/in/seanboult')}>
            <LinkedIn />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
