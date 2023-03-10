### Thurs, Feb 9 2023
Set up group fork, started adding journals, API keys, and basic project set up. We finished our wire frame in the morning, started working on fast API endpoints again. Finished our tables and went over what we would work on the next day.
### Fri, Feb 10 2023
We went over how to write issues with learn and had a couple of questions about the endpoints, We were told they may be wrong, but they were correct. I was slow as fuck doing my issues with the back to back days of no sleep. A team member was not satisfied by our effort, except for Kyle's it seemed. We need to go over fast API in learn for the weekend.
### Mon, Feb 13 2023
We presented wire frames in the morning and decided a couple last minute changes. Went over API lecture with riley. We decided on which database we would use going forward and ended up with Postgres. We started setting up our project to get to the authentication phase. Setting up the database was harder than we expected, learn showed us one way and we were told to do another. Connecting the containers was a pain in the ass and very frustrating.
### Tues, Feb 14 2023
in the morning we finished setting up our tables and ran into several errors. Helped another team figure out how to fix the CRLF problem with pc which we had the previous day. Had to fix a requirements.txt error which wasn't allowing me to build my containers. Almost completed our accounts router paths. had some general issues connecting databases.
### Weds, Feb 15 2023
we had to blow up our accounts paths and start over for authentication. We were getting a dictionary not related to password something, this was caused by not updating my table to allow the hashed_password. Once our authentication worked we started adding tables, queries, and routers for trips.
### Thurs, Feb 16 2023
we finished all event functions and cleaned up models. We changed variable names to better suit our expectations. We went over how we're going to prepare over the weekend.
### Fri, Feb 17 2023
SCHEDULED DAY OFF
### Mon, Feb 20 2023
SCHEDULED DAY OFF
### Tues, Feb 21 2023
in the morning we started working on the final API calls for yelp and the weather. We went over what we did during the long weekend. We made changes to our tables and the layout of them. We finished all of our backend and are starting on our login/authentication part of the front-end. We are struggling now but making good progress and are the best team out there because we are cool.
### Weds, Feb 22 2023
we went over our login/logout on the front-end in the morning. We were stuck on how we should be doing this, redux or not. We ran into issues on how the token is supposed to be stored. It ended up just being our Navbar wasn't inside our AUTH provider in the app.js file. After fixing this and a few routing issues we had, we finished the day going over what materials we should review for the next day.
### Thurs, Feb 23 2023
we implemented redux and started completing our paths for the events/trips frontend. we set up our list trips page to display all the trips and did the same for list events for trips. we were stuck several times trying to display the specific event for each trip and are still unsure of how to pass it down through props or ?. having trouble with the map function in general also.
### Fri, Feb 24 2023
we worked on finding out how to use the form slice. Had issues trying to update and save data. worked on creating our modal to sign up or create a user. worked on passing state and updating the form data.
### Mon, Feb 27 2023
we went over what we did the previous week about the modals and how we actually got to use the state as a prop for the modal to open it, the form data being used for input changes. we create our update modal but couldn't figure out how to link it to the id of the trip to update. we realized we didn't have it linked to a token which is used as the id we were trying to pass, we had to go back and start updating code for the token to be added on the front end side of authentication so when a user is logged in the token is passed to the routes and we can only see data linked to a certain user. We were told by Justin or Louise that we need to have all of our slices in a single file and they can't be separated because they aren't interacting with each other so certain things aren't linked to each other like login and passing the token. Tyler explained to us how to break them down into separate files but still be able to import them. we helped another group get on track to start making a call to their 3rd party API that they were having trouble with.
### Tues, Feb 28 2023
we had issues again with authentication and had to make a simple change with passing something as an object to start the day I can't even remember right now its just a brain melt. we had to change all our useState to redux we were double dipping. Had a working code but we had to refresh screen for anything to take effect. we tried to fix it and made things worse. we've changed stuff to add our about page and had to add CSS styling to our navbar so our video wouldn't block it.
### Weds, Mar 1 2023
Finally fully implemented redux into authentication front end. we had to make changes to our main page for the navbar and other stylings. we added redux to our sign up form and had to fix some stuff with the way we got the token in the nav.js. we didn't have an s at end for invalidates tag and that's why we stayed logged in until a refresh.
### Thurs, Mar 2 2023
we went over how everything interacts with each other. we did the event mutations together and had to errors for returning the body. We added CSS to our main page and others.
### Fri, march 3 2023
SCHEDULED DAY OFF!
### Mon, Mar 6 2023
Practice test day - Wrote our unit tests and had some troubles hitting the yelp API one. Got the plane icon to work for the cursor.
### Tues, Mar 7 2023
We had merge issues with our bootstrap for our main page CSS and our previous styles. continued writing unit tests and worked on our main page CSS. We worked on being able to add an event from the things to do page directly into an event. we got it it to create but we still need to add others things hard to concentrate, had a twisted tea. we made changes to add a video to our things to do page that will be a random generator for an event. learned how to just add a button tag in front of whatever was already made for a className to just add a general style already defined in that .btn class in CSS, thanks to Tyler the CSS god!
### Weds, Mar 8, 2023
We wanted to implement our stretch goals of being able to add an event through our things to do page where it would auto populate the business's information you clicked on and then you could finish filling out an event on. we tried to use redux, but ended up using useState. We clashed on styling and trying to figure out where we wanted to go. talked about the random event generator.
### Thurs, Mar 9, 2023
tidied up flake8 and error codes. we added technologies section, carousel, updated video playing in backgrounds, basically done with project just trying to iron out some navbar and footer issues and add final stylings.
### Fri, Mar 10, 2023
Final Day of project week!
### Mon, Mar 13 2023

### Tues, Mar 14 2023

### Weds, Mar 15, 2023

### Thurs, Mar 16, 2023
