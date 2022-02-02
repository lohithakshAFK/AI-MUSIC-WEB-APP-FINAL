song2 = "";
song1 = "";

left_wrist_x = 0;
left_wrist_y = 0;

right_wrist_x = 0;
right_wrist_y = 0;

leftWristScore = 0;
song1_status = "";

rightWristScore = 0;
song2_status = "";

function preload(){
    song1 = loadSound("centuries2.wav");
    song2 = loadSound("believer2.wav");
}

function setup(){
    canvas = createCanvas(500,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    
    image(video,0,0,500,300);

    fill("red");
    stroke("red");
    
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(leftWristScore > 0.1){
        circle(left_wrist_x,left_wrist_y,20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("song_name_label").innerHTML = "Now Playing : Believer";
        }
    }
    

    if(rightWristScore > 0.1){
        circle(right_wrist_x,right_wrist_y,20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song_name_label").innerHTML = "Now Playing : Iron Man - Centuries";
        }
    }
    
    
    

}

function modelLoaded(){
    console.log("PoseNet Loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("right wrist x = " + right_wrist_x + ", y = " + right_wrist_y);
        console.log("left wrist x = " + left_wrist_x + ", y = " + left_wrist_y);
        console.log(leftWristScore);
        console.log(rightWristScore);
    }
}