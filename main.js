noseX = 0;
noseY = 0;
difference = 0;
RightWristX = 0;
LeftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!');
}

function draw() {
    background('#0D0907');

    document.getElementById("square_side").innerHTML = "Width and Height of a Square will be = " + difference + "px"; 
    fill('#191970');
    stroke('#f5c71a');
    square(noseX, noseY, difference);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);

        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        difference = floor(LeftWristX - RightWristX);

        console.log("LeftWristX = " + LeftWristX + " RightWristX = " + RightWristX + " Difference = " + difference);
    }
}