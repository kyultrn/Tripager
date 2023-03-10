### Thurs, Feb 9 2023

Today, our group completed our wireframe, tables and API endpoints. We verified all of our Gitlabs were working. We created working branches for each person -- mischaworking, etc. so that each person can feel comfortable committing their work consistently without fear of messing up the main branch. We did some research on the Yelp API and what the data was going to look like coming back as JSON. We created our journals, keys.py and are looking forward to starting to work on the back end together.

### Fri, Feb 12 2023
We spent a good amount of time wondering whether or not we should go with Postgres or with MongoDB. We are going to do more research over the weekend and then when we get back Monday discuss it further. At this point, Riley thought we could do okay using either data base.

### Mon, Feb 13 2023

Today we presented our project to the class and got good feedback. Before the presentation we added a few things to the wire frame: We added an additional page for when someone gets recommendations from the API and we also added an "About the site" page where we will show bios about the developers and have a blurb about the website, our idea, project, etc. Today we solidified the database structure, finally choosing a postgres DB and began implementing it.

### Tues, Feb 14 2023

Today we got migrations rolling. After a couple of issues, we were able to finally create the first migration of our accounts file. We also set up pool.py. I am glad that I have been doing the explorations becuase it felt easier to do the SQL stuff after having actually studied some of it ahead of time.

### Weds, Feb 15 2023

Today we finished authentication and got a bunch of routes working. We also created a table for trips. By the end of the day: get one trip, get list of trips were both working. Today we also created a new branch and verified that it was working. The project is going well and we are working as a team.

### Thurs, Feb 16 2023
Today we got a lot done. We changed our API routes to be restful by adding /api/ in front of them. We also were able to complete the entire events.py queries and routes. We struggled with figuring out whether or not we would need to track events by both id AND trip_id or if just using the id would link the event to the trip. I contributed mostly to the delete function as the main programmer. We experimented with how to add start_time and end_time --- as time or strings in our tables and found it tricky to figure out using the browser fastAPI route what was the correct way to do it. Our back end is almost officially done!! All we have left to do is make the calls to the Yelp API.


### Tues, Feb 21 2023
We started the day off setting up our Yelp API -- query and router. We did some troubleshooting and were able to complete the calls. After lunch we set up the weather api and officially completed backend! We then went on to begin our React! We started with the login stuff. It proved more difficult than we expected. The functions, classes etc that I had previously done in other projects and been taught did not seem to directly relate to what we needed to do and it was a little frustrating. Luckily Kyle seemed to figure some of it out before we clocked out for the day and we all worked as a team to do the rest. We have a very solid plan for what we are going to do tmrw and we feel good about our progress as a whole.
### Weds, Feb 22 2023
Today got logout working after 4 hours of intense troubleshooting, youtube watching and finally Tyler helped us. The good news was that the error was quite small and all we needed to do was move the  Nav bar INSIDE of the Auth provider. Before we did this, the autho provider was not actually accessing the function; we were having big issues with our token not displaying (were getting null), thus we were unable to complete our logout functionality. We finally did it and are very proud.

### Thurs, Feb 23 2023
Redux! Today we did redux! We watched some videos and implemented what we saw and we were able to set up both Trips and Events pages using redux. We no longer are using useState and useEffect which is kind of confusing because it feels like we just learned that, but it was exciting to do something new. I am pretty sure it is horrible and I hate it but I am glad we are learning it. It seems like it will be really useful in the future.


### Mon, Feb 27 2023
Today was extremely frustrating. Redux is terrible. It is hard and confusing and it makes me want to fall asleep. We worked with multiple SEIRs and Riley to resolve issues with our login/logout tokens. We should have finalized the login/logout stuff with Redux a few days ago but we thought that we would be able to do that without Redux but turns out we could not. We ended the day by helping Anton's group with their MovieList page. I also helped Yonah's group with some GIT issues. Today was hard.

### Tues, Feb 28 2023
Today was another extremely stressful day with authentication -- I thought we would have finished with the drama from yesterday but no. We worked with Riley, SEIRs and Malcolm for hours trying to resolve our tokem issues ad it finally resolved only SOME of them. While all of this was going on, Andrew and I worked on some CSS and bootstrap stuff. I worked on the Things To Do page and figured out a way to have a video play on the first page of the site. I found the video on Envato. At first I could not get it to play, it might have been an issue with the file being a .mov --- so I imported it into Adobe Premiere Pro and re exported it to a mp4.

### Thurs, Mar 2 2023
Today was a great day --- we went back through all of the Redux concepts from beginning to end and Kyle walked us through the code. Zach helped too. It was great because we went through everything we have done up until this point and mapped where each piece of code led to the next, variables etc. We did all of the event mutations -- add event, delete event and update event. We also began to add CSS to the project, which seems like it will prove more difficult than anyone thought.

### Mon, Mar 6 2023
Today we wrote unit tests. We technically only needed to write one each, but we decided that it would be best to have tests that actually test every feature of the project. So, each of us wrote 3 tests for a total of 12 unit tests.
### Tues, Mar 7 2023
After speaking with people from other groups, it really seems like our group is doing way more work in every possible way. It is frustrating that a lot of other groups are just hanging out and doing nothing and we are pretty stressed out about a lot of different things.

### Weds, Mar 8, 2023
On Wednesday, March 8 we worked really hard on creating events on our things to do page. We knew we wanted to add these events as a stretch goal but it seemed like we were getting closer to being able to do it by the actual project deadline which was exciting. We are all doing a little more CSS but it's honestly really hard and I feel like everyone besides Andrew hates it. Kyle did a really great job on the yelp events and worked on that logic for quite a while.

### Thurs, Mar 9, 2023
Today we did a lot of CSS work. I also was able to fix the "Things to do" page. You are able to now use the things to do page if you are logged in or out. If you are not logged in, you will not see the "add to events" button which allows you to add the event to your trip events. We added a few videos to the background of our pages and Zach, Kyle and Andrew worked on the footer. I learned how to create CSS modules, which I wish I had learned about sooner becuase our index.css page is an absolute disaster.  I spent a long time de-bugging the create yelp events thing --- it seemed to be working at the end of the night, but then when I logged off Zoom I was unable to add events that were suggested from Yelp... I ended up figuring it out. I console-logged a bunch of things and eventually the issue was resolved.
