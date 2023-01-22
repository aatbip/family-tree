# Create your ancestral family tree and export json or pdf

To use the application, just clone the repo. Go to the project's root directory then run `npm i` to install all dependencies. Then, run `npm start` to start the app. 

### Shape of json data
```
{
    "id": "",
    "parentId": null,
    "name": "",
    "familyDetail": {
          "spouse": "",
          "location": "",
          "birthYear": "",
          "presentAddress": "",
          "familyPhoto": [],
        },
    "children": [],
}
```

### Technical Summary

family-tree app is built with TypeScript, React, and MUI. It uses Breadth First Search (BFS) algorithm to search and manipulate nodes on a tree data structure.