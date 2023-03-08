#### DEVELOPERS
- Mischa Goodman
- Zach Dempsey
- Kyle Tran
- Andrew Fockler

#### TRIPAGER WEBSITE
Tripager - Plan and manage your next trip here.

#### DESIGN
[API Design](/docs/api_design.md)
[Data Models](/docs/Tripager_data_models.jpg)
[Wire Frame](/docs/Tripager_wire_frame_3.8.23.png)

Integrations:
Tripager will need to pull the following data from third-party sources:
- Business Data
	- Currently sourced from Yelp's API
- Weather Data
	- Currently sourced from WeatherAPI


#### INTENDED MARKET
In Tripager, we are targeting people who travel. Specifically, consumers that are looking for a more organized travel experience.

#### FUNCTIONALITY
***Not-Logged in users***
If a user is not logged into Tripager, they will have access to:
- Things To Do page
- About Tripager

Things to do:
- Users are able to search for activities, restaurants,  services, businesses, etc
- By typing in a search term and a location, users are able to see 12 of Yelp's top hits for their intended search. On each business hit, users will see:
	- Picture of the business
	- Name
	- Address
	- "Get details" button
- When a user clicks "Get details", they will be  re-directed to a Yelp detail page for that particular business

About Tripager:
- Users can learn the who, what, where, when and why behind Tripager
- Users will have access to:
	- About Tripager
	- Tech stack
	- Details about the developers

***Logged in users***
When a user is logged in, they have access to all of the trip-planning functionality that Tripager has to offer.

Trip Manager:
- Users have the ability to create, manage and delete trips
- When creating a trip, users are required to enter the following information:
	- Name of trip
	- City
	- State
	- Start date
	- End date
- Within each trip, users have the opportunity to create, manage and delete events

Event Manager:
- When a user clicks a trip, they will then be directed to a page managing all events associated with that trip
- On the Event Manager page, users are able to create, update and delete events
- When creating an event, users are required to enter the following information:
	- Name
	- Location
	- Date
	- Start time
	- End time
- The following information event information is optional:
	- Description
	- Picture url (the picture is then displayed)

Things To Do:
- Along with all the previously listed features, logged in users have the opportunity to add a Yelp event to a trip
- For logged in users,  an "Add to events" button appears next to "Get details" button
- When "Add to events" is clicked:
	- A "Create Event" modal appears allowing customers to add the activity to their events
	- Some event details auto-populate with Yelp's business information (a user can change any of these auto-populated details if they want to):
		- Name
		- Location
		- Picture
	- Users must input:
		- Trip (chosen from a drop-down menu)
		- Details (optional)
		- Start time
		- End time
	- Optional user input:
		- Details


#### PROJECT INITIALIZATION
To fully enjoy this Tripager on your local machine, please make sure to follow these steps:
1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create tripager-data
4. Run docker compose build
5. Run docker compose up
6. Run docker exec -it tripager-api-1 bash
7. Exit the container's CLI, and enjoy Tripager to its fullest!
