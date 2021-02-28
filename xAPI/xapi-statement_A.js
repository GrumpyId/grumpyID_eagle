/* Base xapi-statement based on tutorials by Devlin Peck - https://www.devlinpeck.com/tutorials/full-guide-xapi-storyline */

/* Set conf object so that we can communicate with LRS */

const conf = {
    "endpoint": "https://lrs.placeholder.com",
    "auth": "Basic " + toBase64("username:password")
};
ADL.XAPIWrapper.changeConfig(conf); 

/* Timer Variables */
var cSeconds = 0;
var slideSec = 0;
var sceneSec = 0;

/* Timer Control Init */
var isCourseTimeActive = false;
var isSlideTimeActive = false;
var isSceneTimeActive = false;

/* Int for timer increments */
window.setInterval( () => {
    if (isCourseTimeActive === true) {
        cSeconds += 1
    }
    if (isSlideTimeActive === true) {
        slideSec += 1
    }
    if (isSceneTimeActive === true) {
        sceneSec += 1
    }
}, 1000);

/* Timer Management Object */
const manageTimer = {
    "course": {
        "start": () => {isCourseTimeActive = true},
        "stop": () => {isCourseTimeActive = false},
        "reset": () => {cSeconds = 0}
    },
    "slide": {
        "start": () => {isSlideTimeActive = true},
        "stop": () => {isSlideTimeActive = false},
        "reset": () => {slideSec = 0}
    },
    "scene": {
        "start": () => {isSceneTimeActive = true},
        "stop": () => {isSceneTimeActive = false},
        "reset": () => {sceneSec = 0}
    }
}

/* Global variables */
var player = GetPlayer();
var fNamejs = player.GetVar("fName");
var lNamejs = player.GetVar("lName");
var UINjs = player.GetVar("uin");
var uEmailjs = player.GetVar("uEmail");
var coursejs = player.GetVar("course");
var sectionjs = player.GetVar("section");
var semesterjs = player.GetVar("semester");
var instructjs = player.GetVar("instructor");
var uNamejs = lNamejs + ", " + fNamejs;

/* Function Send to the LRS */
function sendStatement(verb, verbId, object, objectId, objectDescription, activityType, openTextVar, timer) {
    /* Set the variables that can be used only in this function */
  const uResponsejs = player.GetVar(openTextVar);
  const uScorejs = player.GetVar("uScore");  
  const maxScorejs = player.GetVar("maxScore");
  const scaledScore = uScorejs / maxScorejs;
  const userPass = scaledScore >= 0.8 ? true : false;
  /* Initialize finalDuration variable */
  let finalDuration; 

  /* Report course time, slide time, or no time based on parameter */
  if (timer == "course") {
    finalDuration = convertToIso(courseSeconds);
  } else if (timer == "slide") {
    finalDuration = convertToIso(slideSeconds);
  } else if (timer == "scene") {
      finalDuration = convertToIso(sceneSec);
  } else {
      finalDuration = null;
  }
 
  /* xAPI send definition */
  const statement = {
      "actor": {
          "name": uNamejs,
          "mbox" : "mailto: " + uEmailjs
      },
      "verb": {
          "id": verbId,
          "display": { "en-US": verb }
      },
      "object": {
          "id": objectId,
          "definition": {
              "name": { "en-US": object },
              "description": { "en-US": objectDescription },
              "type": activityType
          },
          "objectType": "Activity"
      },
      "result": {
          "response": uResponsejs,
          "score": {
              "min": 0,
              "max": maxScorejs,
              "raw": uScorejs,
              "scaled": scaledScore
          },
          "success": userPass
      }
  };
  /* Send the xAPI statement */
  const result = ADL.XAPIWrapper.sendStatement(statement);

/* Function to convert the seconds into ISO 8601 format */
function convertToISO(secondsVar) {
    let seconds = secondsVar;
    if (seconds > 60) {
      if (seconds > 3600) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        seconds = (seconds % 3600) % 60;
        return `PT${hours}H${minutes}M${seconds}S`;
      } else {
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        return `PT${minutes}M${seconds}S`;
      }
    } else {
      return `PT${seconds}S`;
    }
  }
};