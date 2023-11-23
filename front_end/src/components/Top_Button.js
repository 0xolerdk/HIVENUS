import '../components/Top_Button.css';


function startButton(){
    console.log("pressed");
}

function Top_Button() {
    return(
        <button className="button_start" onClick={startButton}>  
            START
        </button>

    );
}

export default Top_Button;