song = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

rightWristScore = 0;
leftWristScore = 0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("model loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x: " + leftWristX + " y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x: " + rightWristX + " y: " + rightWristY);

        rightWristConfidence = results[0].pose.rightWrist.confidence;

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("Left wrist score:" + leftWristScore);

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("Right wrist score:" + rightWristScore);
    }
}

function draw() {
    image(video, 0, 0, 800, 600);

    stroke("red");
    fill("red");
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 10);

        leftWristYnumber = Number(leftWristY);
        remove_decimals = Math.floor(leftWristYnumber);
        volume = remove_decimals / 600;

        document.getElementById("volume").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }

    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 10);

        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);

            document.getElementById("speed").innerHTML = "Speed: 0.5";

        } else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);

            document.getElementById("speed").innerHTML = "Speed: 1";

        } else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);

            document.getElementById("speed").innerHTML = "Speed: 1.5";

        } else if (rightWristY > 300 <= 400) {
            song.rate(2);

            document.getElementById("speed").innerHTML = "Speed: 2";

        } else if (rightWristY > 400 <= 500) {
            song.rate(2.5);
            
            document.getElementById("speed").innerHTML = "Speed: 2.5";

        } else if (rightWristY > 500 <= 600)
        {
            song.rate(3);

            document.getElementById("speed").innerHTML = "Speed: 3";
        }
    }



}

function playSong() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);

}