/* xAPI Statment provides the customizable js functions that are called by the player.

Please note that this file is specific to projects developed in Articualte Storyline and that use standardized variables.

Whose determined these standardized variables? Are, they industry standard? I did. No. - The GrumpyID */

var cSeconds = 0;
var sSeconds = 0;

var cTimerActive = false;
var sTimerActive = false;

window.setInterval( () =>{
    if (cTimerActive === true) {
        cSeconds += 1
    }
    if (sTimerActive === true) {
        sSeconds += 1
    }
}, 1000);

const timerManager = {
    "course": {
        "start": () => {iscTimerActive = true},
        "stop": () => { iscTimerActive = false},
        "reset": () => { iscTimerActive = 0}
    },
    "slide": {
        "start": () => { issTimerActive = true},
        "stop": () => { issTimerActive = false},
        "reset": () => { issTimerActive = 0}
    }
}

function sendStatement(verb, verbId, object, objectId, objectDescription, activityType, shortText, timer) {
    const player = GetPlayer();
    const secret_1js = player.GetVar("secret_1");
    const secret_2js = player.GetVar("secret_2");
    const fNamejs = player.GetVar("fName");
    const lNamejs = player.GetVar("lName");
    const uNamejs = lNamejs + ", " + fNamejs;
    const uEmailjs = player.GetVar("uEmail");
    const uRespAjs = player.GetVar(shortText);
    const conf = {
        "endpoint": secret_1js,
        "auth": "Basic " + toBase64(secret_2js)
    };
    ADL.XAPIWrapper.changeConfig(conf);

    let finalDuration;
    if (timer == "course") {
        finalDuration = convertToIso (cSeconds);
    } else if (timer == "slide") {
        finalDuration = convertToIso(sSeconds);
    } else {
        finalDuration = null;
    }


    const statement = {
            "actor": {
                "name": uNamejs,
                "mbox": "mailto:" + uEmailjs
            },
            "verb": {
                "id": verbId,
                "display": { "en-US" : verb }
            },
            "object": {
                "id": objectId,
                "definition": {
                    "name": { "en-US": object },
                    "description": { "en-US": objectDescription },
                    "type": activityType
                }
            },
            "objectType": "Activity",
            "result": {
                "response": uRespAjs,
                "duration": finalDuration
            }
        };
        const result = ADL.XAPIWrapper.sendStatement(statement);
        function convertToIso (secondsVar) {
            let seconds = secondsVar;
            let finalDuration;
            if (seconds >60) {
                if (seconds >3600){
                    const hours = Math.floor(seconds/3600);
                    const minutes = Math.floor((seconds % 3600) /60);
                    seconds = (seconds % 3600) % 60;
                    return `PT${hours}H${minutes}M${seconds}S`;
                } else {
                    const minutes = Math.floor(seconds/60);
                    seconds %= 60;
                    return `PT${minutes}M${seconds}S`;
                }
            } else {
                return `PT${seconds}S`;
            }
        }
}
