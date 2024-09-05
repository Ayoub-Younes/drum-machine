const App = () => {

    const [display, setDisplay] = React.useState("");
    const [activeKey, setActiveKey] = React.useState(null);

    const handleClick = (event) => {
        const pad = document.getElementById(event.target.id);
        if (pad){
          const clipName = pad.getAttribute('name')
          const clip = pad.children[0];
          clip.play();
          setDisplay(clipName);
        }

      };

      const handleKey = (event) => {
        const keyCode = event.key.toUpperCase();
        setActiveKey(keyCode)
        const pad = document.getElementById(keyCode);
        if(pad){
          const clipName = pad.getAttribute('name')
          const clip = pad.children[0];
          clip.play();
          setDisplay(clipName);
        }
      };      

      React.useEffect(() => {
        document.addEventListener('keydown', handleKey);
        document.addEventListener('keyup', () => setActiveKey(null));
        return () => {
          document.removeEventListener('keydown', handleKey);
          document.removeEventListener('keyup', () => setActiveKey(null));
        };
      }, []);


    return (
        <div id="drum-machine">
          <div className="display-container">
          <DrumPlay drum={drum} handleClick={handleClick} handleKey={handleKey} activeKey={activeKey}/>
          <Display clipName={display} />
          </div>
          <VolumeControl />
        </div>
      );
}

const DrumPlay = ({ drum, handleClick, activeKey }) => (
    <div className="drumpad">
      {drum.map((clip) => (
        <button
          className={`button drum-pad ${activeKey === clip.key ? 'active' : ''}`}
          id={clip.key}
          name={clip.name}
          onClick={handleClick}
          key={clip.key}
        >
          {clip.key}
          <audio id={clip.key} src={clip.src} className="clip"></audio>
        </button>
      ))}
    </div>
  );

const Display = ({clipName}) => <div id="display">{clipName}</div>

const VolumeControl = () => {
  const [volume, setVolume] = React.useState(1);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    document.querySelectorAll('audio').forEach((audio) => {
      audio.volume = event.target.value;
    });
  };

  return (
    <div id="volume-container">
      <input
        id="volume-bar"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <label id="volume-label">Volume</label>
    </div>
  );
};



  const path = 'https://s3.amazonaws.com/freecodecamp/drums/';
  const drum = [
    { key: "Q", keycode: 113, name: "Heater 1", src: `${path}Heater-1.mp3` },
    { key: "W", keycode: 119, name: "Heater 2", src: `${path}Heater-2.mp3` },
    { key: "E", keycode: 101, name: "Heater 3", src: `${path}Heater-3.mp3` },
    { key: "A", keycode: 97, name: "Heater 4", src: `${path}Heater-4_1.mp3` },
    { key: "S", keycode: 115, name: "Clap", src: `${path}Heater-6.mp3` },
    { key: "D", keycode: 100, name: "Open-HH", src: `${path}Dsc_Oh.mp3` },
    { key: "Z", keycode: 122, name: "Kick-n'-Hat", src: `${path}Kick_n_Hat.mp3` },
    { key: "X", keycode: 120, name: "Kick", src: `${path}RP4_KICK_1.mp3` },
    { key: "C", keycode: 99, name: "Close-HH", src: `${path}Cev_H2.mp3` },
  ];
  
  ReactDOM.render(<App />, document.getElementById("app"));