const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

const readUsersFromFile = () => {
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

const users = readUsersFromFile();

const MAX = process.env.API_MAX || 25;

const genKey = () => {
  return [...Array(30)]
    .map(() => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

const createUser = (_name, req) => {
  let today = new Date().toISOString().split('T')[0];
  let user = {
    id: Date.now(),
    api_key: genKey(),
    name: _name,
    host: req.headers.origin,
    usage: [{ date: today, count: 0 }],
  };
  console.log('Add new user to API.');
  users.push(user);
  writeUsersToFile(users);
  return user;
};

const validateKey = (req, res, next) => {
    let api_key = req.header('x-api-key');
    let account = users.find((user) => user.api_key == api_key);
  
    if (account) {
      let today = new Date().toISOString().split('T')[0];
      let usageIndex = account.usage.findIndex((day) => day.date == today);
  
      if (usageIndex >= 0) {
        if (account.usage[usageIndex].count >= MAX) {
          res.status(429).send({
            error: {
              code: 429,
              message: 'Max API calls exceeded.',
            },
          });
        } else {
          account.usage[usageIndex].count++;
          console.log(`Good API call: ${account.name}`, account.usage[usageIndex]);
          writeUsersToFile(users);
          next();
        }
      } else {
        account.usage.push({ date: today, count: 1 });
        writeUsersToFile(users);
        next();
      }
    } else {
      res.status(403).send({ error: { code: 403, message: 'This is not permitted.' } });
    }
  };
  
  module.exports = { createUser, validateKey };
