class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drum: drumMachine,
      key:"",
      display: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

    handleClick(event){
      const pad = document.getElementById(event.target.id)
      const sound = pad.children[0]
      this.setState({
        display: event.target.id
      })
        sound.play();
    }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey)
  }

  handleKey(event){
      const keyCode = event.key.toUpperCase()
      const button = document.getElementById(keyCode).parentNode
      const sound = document.getElementById(keyCode);
      const element = sound.parentNode
      this.setState({
        display: element.id
      })
      sound.play();
    }
    
  render(){
    return (
      <div id="drum-machine" className="container text-center">
        <DrumClick 
          drum={this.state.drum} 
          handleClick = {this.handleClick}
          handleKey = {this.handleKey}
          />
        <Display button={this.state.display} />
      </div>
    )
  }
}

// DRUMCLICK COMPONENT //

class DrumClick extends React.Component {
  constructor(props){
  super(props);
  }
  render(){
    const drumpad = this.props.drum.map(audio => 
          <button  className="button drum-pad" id={audio.name} onClick={this.props.handleClick} onKeyDown={this.props.handleKey}>{audio.key}
            <audio id={audio.key} src={audio.src} class="clip"></audio>
          </button>)
    return(
      <div className="drumpad">
          {drumpad}
      </div>
    )
  }
}

// DISPLAY COMPONENT //

const Display = (props) => {
  return <div id="display">{props.button}</div>
};

// CONSTS //
const path = 'https://s3.amazonaws.com/freecodecamp/drums/'
const drumMachine = [
  {key: "Q", keycode: 113, name: "Heater 1", src: `${path}Heater-1.mp3`}, 
  {key: "W", keycode: 119, name: "Heater 2", src: `${path}Heater-2.mp3`},
  {key: "E", keycode: 101, name: "Heater 3", src: `${path}/Heater-3.mp3`},
  {key: "A", keycode: 97, name: "Heater 4", src: `${path}Heater-4_1.mp3`},
  {key: "S", keycode: 115, name: "Clap", src: `${path}Heater-6.mp3`},
  {key: "D", keycode: 100, name: "Open-HH", src: `${path}Dsc_Oh.mp3`},
  {key: "Z", keycode: 122, name: "Kick-n'-Hat", src: `${path}Kick_n_Hat.mp3`},
  {key: "X", keycode: 120, name: "Kick", src: `${path}RP4_KICK_1.mp3`},
  {key: "C", keycode: 99, name: "Close-HH", src: `${path}Cev_H2.mp3`}
]
ReactDOM.render(<App />, document.getElementById("app"));