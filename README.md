# EAGLE BASE

Baseline xAPI files for Storyline Developments. Nothing complex in these files....just the basics.  Complex stuff comes later.

I want to give a huge shout out to Devlin Peck and his excellent tutorials that can be found at:

[The Full Guide to xAPI and Storyline](https://www.devlinpeck.com/tutorials/full-guide-xapi-storyline)

If you are not sure what xAPI is or how to take advantage I would recommend that you start with the link above.

## Storyline Execute JavaScript Triggers

The following trigger will pass baseline + objectDescription and activity type.
- 
```javascript
sendStatement("verb", "verbId", "object", "objectID", "objectDescription", "activityType");
```

The following trigger will pass baseline + objectDescription and activity type.
- 
```javascript
sendStatement("verb", "verbId", "object", "objectDescription", "activity Type", "uResp[n]sl");
```
Note- the "uResp[n]sl" variable is the storyline variable...this variable is passed from storyline into the function.  There is nothing that changes within the xapi-statment.js that will need to change.

![example](https://uploads-ssl.webflow.com/5e9f730af9a5b1a2d63da01e/5eab496ab4f82597e088d3e6_ss2-resized.png)

### Quiz Results

No new parameters were added to the function.

Storyline will need two new variables:

* maxScore
* uScore

A trigger needs to be added on each correct answer to adjust uScore by 1 on each correct answer.

The trigger for the xAPI can be set to the start of the results slide.

### Timer Scripts 

#### Manage Course Timers

Place on first slide with a timeline start trigger.

```
manageTimer.course.start();
```

Restart Button Trigger

```
manageTimer.course.reset();
```

Stop Timer Script

```
manageTimer.course.stop();
```

Sending Course Duration

```
sendStatement("verb", "verbId", "object", "objectDescription", "activity Type", "uResp[n]sl", "course")
```

Slide Durations

Place on a slide's timeline start trigger.

```
manageTimer.slide.start();
```

Restart Trigger use on slides 2-n

```
manageTimer.slide.reset();
```

Stop Timer Script

```
manageTimer.slide.stop();
```

Sending Slide Duration

```
sendStatement("verb", "verbId", "object", "objectDescription", "activity Type", "uResp[n]sl", "slide")
```

If we want to capture a duration of a lesson then we would need to create a lesson variable and send at the end of each lesson.
