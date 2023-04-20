# PacMan-JS

This project is my submission for the COPS week 2023

It is a simple game of Pacman

I have implemented the server too, and a login functionality 
The hiscore of the user is also stored in the database


## How to set it up:
* clone into the repo
* cd to folder "Server"
* install the dependencies using `npm install`
* run `npm run start` to start the server
* follow the link printed to access the webpage

## Key features:
* A login/signup page asking for name and password
* A prompt on invalid input or failed attempt to login/signup
* The backend is implemented in NodeJS and Express
* The backend has some APIs used by the actual game for various purposes, like getting a random-colored ghost image, getting and updating the hiscore
* Highest score is locally stored in the browser, and is updated after the current game is over and next game starts
* Used the BEM notation in html class names
* Used SCSS to make CSS more managable
* Used the MVC architecture in the backend
* Audio is played when the pacman kills a ghost, is killed by one, etc
* The Pacman can "plan" a move ahead, for instance, if the user presses right key but the Pacman cannot currently move right, it will do so at a later point when it finally is able to move right


<br>
This project is my original work and is therefore prone to bugs. It is a result of several sleepless nights throughout the week. I have tried my best to manage this along with the upcoming Mid Semester examinations, but feel that this project could have been a lot better if I had more time to work on it. 
<br>
I hope it is good enough.