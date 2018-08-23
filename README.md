# query-console
A console for tracking and inspecting the queries being made by applications by tailing and parsing log files.

## Getting Started
+ Install query-console globally:
```
npm install -g query-console
```

+ Create a config JSON file:
```json
{
  "query_trackers": [
    {
      "service": "Application One",
      "log_path": "/Desktop/app-one/log/development.log",
      "regexes": [
        {
          "expression": ".*(select|create|update|delete|insert)\\b",
          "ignore_case": true
        }
      ]
    },
    {
      "service": "Application Two",
      "log_path": "/Desktop/app-two/log/development.log",
      "regexes": [
        {
          "expression": ".*(FROM|WHERE)\\b",
          "ignore_case": false
        }
      ]
    },
  ]
}
```

+ Then start query-console with:
```
query-console
```
