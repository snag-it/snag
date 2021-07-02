const redisClient = require('redis').createClient;
const redis = redisClient();

const cacheController = {};

cacheController.makeCachedItem = (req, res, next) => {
  redis.set(req.body.item, JSON.stringify(res.locals.scraped));
  redis.expire(req.body.item, parseInt(1200));
  return next();
};

cacheController.findCachedItem = (req, res, next) => {
  redis.keys('*', (err, reply) => {
    console.log(reply);
  });

  redis.get(req.body.item, (err, reply) => {
    if (err) return next(err);
    if (reply) {
      reply = JSON.parse(reply);
      return res.status(200).json(reply);
    }
    res.locals.scraped = {};
    return next();
  });
};

module.exports = cacheController;
