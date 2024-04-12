import '../components/Top_Button.css';


function startButton() {
    console.log("pressed");
}

function Top_Button() {
    return (
        <div class="center"> 
            <a class="my-button" href="#"><span></span>START</a>
        </div>
    );
}

export default Top_Button;