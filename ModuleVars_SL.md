# Storyline File Variables

These variables are required to be defined and populated in each storyline module (file) if they are to be used.

## Global Variables: User Identification

Required | SL Variable | Description | Mapped to
----- | ------ | ------------- | --------
REQUIRED | fName | Learner First Name | fNamejs
REQUIRED | lName | Learner Last Name | lNamejs
Depends | UIN | Universal ID | UINjs
REQUIRED | uEmail | Learner email address | uEmailjs
optional | course | "course" defined the course of study the user is enrolled into inorder to access the learning content | coursejs
optional | section | The course "section" group that the leaner's enrollment is in | sectionjs
optional | semster | The time period for which the learner is enrolled into the course | semesterjs
optional | instructor | The higest level instructor assigned to the course | instructjs

### Calculated Global Variables

Required | Forumula | Description | Mapped to
----- | ------ | ------------- | --------
REQUIRED | lname+", "+fname | Learner Full Name | uNamejs

## Function Variables: Activity Responses

SL Variable | Description | Mapped to
------- | ----------------------------- | --------------
OpenTextVar | Shortanswer Response | uResponsjs
uScore | user raw score on a quizzed activity | uScorejs
maxScore | Max possible points on a quizzed activity | maxScorejs

### Calculated Local Variables

Forumula | Description | Mapped to
------ | ------------- | --------
uScore/maxScore | User Scaled Score | scaledScore
scaledScore >= 0.8 ? true : false; | User Passed or Failed? | userPass
