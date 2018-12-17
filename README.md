# Movie-searcher
Basic REST API written in NodeJs.  
Application is available online: http://movies-searcher.herokuapp.com/  
Frameworks used:
  - Express
  - TypeORM
  - Mocha
# Features
**Add movie to database**  
POST, `api/movies`  
Body:
```json
{"title": "Matrix"}
```
**Get movies**  
GET, `api/movies`

**Add comment to database**  
POST, `api/comments`  
Body: 
```json
{"author": "Pafker",
"content": "Comment content",
"movie": "Matrix"}
```
**Get comments**
GET, `api/comments`

# Installation
1. Close repository to your local machine
2. Install packages `npm install`
3. Create `.env` file in main folder: 
```
DATABASE_URL=<provide here url to your database>
OMDB_APIKEY=<provide here your omdb api key>
```
4. Run application `npm run start`