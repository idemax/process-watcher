# process-watcher

You can watch and log a process in Windows.

## Install

1. Node.js / NPM
2. Clone the project
3. Via terminal in the project folder execute `npm i`

## Run

Via terminal in the project folder execute: `node .\index.js "your_process_name"`

Example: `node .\index.js "sublime_text.exe"`

## Log

In the project folder has a `logs` folder where will be saved every log JSON file.

Log example:

```
{
    "logs": [
        {
            "process": "unity.exe",
            "status": "open",
            "dateTime": "2019/05/2 17:12:94"
        },
        {
            "process": "unity.exe",
            "status": "close",
            "dateTime": "2019/05/2 17:12:40"
        }
    ],
    "openCount": 1,
    "closeCount": 1
}
```
