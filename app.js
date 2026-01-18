const express = require('express');
const Redis = require('ioredis');

const app = express();
const port = 3000;

// הגדרת פרטי החיבור לרדיס
const client = new Redis({
    port: 15589, // פורט של שרת הרדיס
    host: 'redis-15589.c10.us-east-1-4.ec2.redns.redis-cloud.com', // הכתובת של שרת הרדיס
    username: 'default', // שם המשתמש לחיבור
    password: 'FDU4ID8YPkuz7RDDjSNcol8wTheDZ8ei' // הסיסמה לחיבור
});

// בדיקת חיבור לרדיס
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

app.get('/', (req, res) => {
    // שימוש ברדיס לקבלת מידע ושליחתו בתגובה
    client.get('visits', (err, visits) => {
        if (err) {
            res.send('Error: ' + err);
            return;
        }

        visits = visits ? parseInt(visits) + 1 : 1;
        client.set('visits', visits);
        res.send('Number of visits is ' + visits);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});