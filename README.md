# VersusVirus:  A platform to connect the medical community with 3D printing volunteers 

## What it does

This project provides a marketplace to centralize all exchanges related to fighting COVID-19 with 3D printed components. Thanks to this tool, we will help whoever is in the front line against the new coronavirus to leverage as many resources as possible from the community.

Through a light-weight and user-friendly platform, our project provides a means for healthcare organisations, drug stores or home caregivers to :

* Reach out to the 3D printing community to address shortage of critical medical equipment
* Efficiently plan resource management by monitoring 3D printing community resources in real-time
* Keep an eye on quality of proposed contributions by monitoring materials used by each individuals

But the contribution of our project does not stop there! It provides significant improvements to the 3D printing community as well! We allow this community to:

* See what are the actual needs of their local healthcare shop/worker/institution
* Step up in the fight in a very simplified way


Delving more into the details, our platform proposes the following workflow

* A healthcare professional (the Customer) creates a Request for a given product and for a given quantity,  instantly broadcasted to the currently registerd 3D-printing community, and persisted so that new joiners are able to see it.

* A 3D printer possessor (the Provider) can see in real-time those new requests, and can decide to propose to the Customer its services. For that, the Provider gives the plastic with which he will built the required product, and the expected amount he plans to built, and submits his proposal to the Customer.

* Once a Provider submits their proposal, the Customer gets a prompt with the proposal, and can look at the materials used and the address of the Provider to validate the “transaction” or to delay it if no proposal more interesting comes up.


Communication between two agents will happen over mail, but since a “promise-to-deliver” is registered in the application, our project provides also an instant monitoring tool and can help efficient exchanges of critical supplies. No hospitals will receive 3,000 masks too many, producing a shortage of masks in the next town hospital, nor will a home caregive’s flat be filled with 100 boxes of selflessly donated face shields.


## How we built it

We built the web-application from scratch .
The application is containerized and deployed to Google Cloud Platform.
We built the back-end in Python using a Flask REST API accessing a SQL database.
The front-end is a React app in Typescript. For now Log In/Register page is done. There are currently one main view for Provider and one main view for Customer. Every action will happen within these views. For example, if a Provider clicks on a Proposal, it enables a new div that will be displayed on top of the page, like a popover component.


## Challenges we ran into

We ran into various kind of challenges:

* A full-remote hackathon is hard. The fast pace requires quick communication and collaboration. Even with modern collaborative tools like Slack, Miro, Zoom, Quip, ... it is not as efficient as being in the same room.
* Getting contacts to validate the use case - but we made it 💪
* Deployment issues of containers to the cloud
* Database connections while setting up. The intensive format of the hackathon makes you overlook significant bits of error messages 😅


## Accomplishments that we're proud of

* The website - built from scratch - is almost functional in less than 36h.
* We split the tasks quite efficiently to maximize the output during the event.


## What we learned

* Each of us gained new full-stack related technical knowledge.
* We learned about medical equipment against COVID-19 and very basic knowledge of 3D-printing
* Some of us got to use new design tools around user journey, mocking and presentation


## What's next for 3D4Health

* Implementing filtering features for healthcare professionals (mainly based on distance)
* Implementing Providers categorization regarding their 3D equipment (size or accuracy of printer might important)
* Though this platform is designed for emergency cases where certification questions would be bypassed, we might want to discuss legal concerns about potential non-certified equipment to provide this platform with a sturdier frame



## Deploy locally

``` sh
pushd client
yarn build
yarn install
popd

docker build -t versusvirus .
docker run -i -t -p 8080:8080 versusvirus
```
