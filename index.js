const exec = require('child_process').execSync;
const fs = require('fs-extra');
const moment = require('moment');

const startTime = moment();
const logFolder = './logs';
const procces2Watch = process.argv[2].trim();
const logFileName = `${logFolder}/${procces2Watch}_${moment().format("YYYY-MM-DD")}.json`;

var hasProcessRunning = false;

if(!fs.existsSync(logFolder)) fs.mkdirSync(logFolder);

function getLogJSON() {
	if(!fs.existsSync(logFileName)) 
		fs.writeFileSync(logFileName, JSON.stringify({}));

	const logFile = JSON.parse(fs.readFileSync(logFileName).toString('utf8'));

	if(!logFile.logs) logFile.logs = [];
	
	return logFile;
}


function registerUnityProcess(isClose=false) {
	const logJSON = getLogJSON();
	const countTerm = isClose ? 'closeCount' : 'openCount';
	const countParam = logJSON[countTerm];
	const count = !!countParam ? countParam : 0;
	const logValue = {
		process: procces2Watch,
		status: isClose ? 'close' : 'open',
		dateTime: moment().format("YYYY/MM/DD HH:mm:ss")
	};

	logJSON.logs.push(logValue);

	console.log(logValue);

	logJSON[countTerm] = count + 1;

	saveLogFile(logJSON);
}

function saveLogFile(json){
	fs.writeFileSync(logFileName, JSON.stringify(json, null, 4));
}

function checkUnityProcess() {
	const proccessRunning = exec('tasklist /fo csv')
	.toString('utf8')
	.trim()
	.replace(/\"/gmi, '')
	.split('\n')
	.map(e => e.trim().split(','));

	var processWasFound = false;
	for (var i = 0; i < proccessRunning.length; i++) {
		const processName = proccessRunning[i][0].toString().trim().toLowerCase();
		
		if(processName === procces2Watch) {
			processWasFound = true;

			if(!hasProcessRunning){
				hasProcessRunning = true;
				registerUnityProcess();
			}

			break;
		}
	}

	if(!processWasFound){
		if(hasProcessRunning){
			hasProcessRunning = false;

			registerUnityProcess(true);
		}
	}

	setTimeout(checkUnityProcess,1000);
}

checkUnityProcess();
