

let condition = true;
function play_music()
{
    
    const music_player = document.getElementById("music-player");
    const music_button = document.getElementById("music_button");
    if (condition == true )
    {
        music_player.play();
        condition = false;
    }
    else{
        music_player.pause();
        condition = true;
       

    }
    
}

