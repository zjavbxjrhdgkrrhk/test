import React,{ useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const year = currentDateTime.getFullYear();
  const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDateTime.getDate().toString().padStart(2, '0');
 

  const [cheerUp, setCheerUp] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(true);
  
  const cheerUps = ["멋진 날이 될 거예요!", "좋은 하루 보내세요!", "오늘은 어땠나요?", "다 잘 될 거예요!"];
  const getRandomIndex = function(length) {
    return parseInt(Math.random() * length)
  };
  

  useEffect(() => {
    setCheerUp(cheerUps[getRandomIndex(cheerUps.length)]);

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect( () => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async(position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
        setWeather(response.data.weather[0].description);
        setLoading(false);
        });
      } catch(error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  },[]);

 
  return (
    <div className="App">
      
      <div>
        <div className="welcomeSign">
          반가워요,
          <div className='userName'>
            Guest.
          </div>
            {cheerUp}
        </div>
        </div>
      
      <div className="mirror-space mirror"></div>
      
      <div>
      <div className="dateTime">
        <div className="date">
          <div className='year'>
          {year}
          </div>
          <div className='monthDay'>
          {month}.{day}.
          </div>
        </div>
        <div className="time">
          {currentDateTime.toLocaleTimeString()}
        </div>
      </div>
      </div>
      
      <div className="mirror-space mirror-4">widget1</div>
      <div className="mirror-space mirror"></div>
      <div className="mirror-space mirror-6">
        {loading ? 
        "날씨 정보 가져오는 중...": 
          (weather ? `날씨: ${weather}` : "날씨 정보를 가져올 수 없습니다.")}
      </div>
      
      <div>
        <div className="register">
          Blur 앱에 다음 번호를 입력해 로그인 
          <div className='registerNum'>
            0985
          </div>
        </div>
        <div>  
        </div>
      </div>

      <div className="mirror-space mirror"></div>
      <div className="mirror-space mirror-9">widget4</div>
    </div>
  );
}

export default App;
