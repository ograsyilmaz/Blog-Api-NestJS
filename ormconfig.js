module.exports = {
  type: 'mongodb',
  url: process.env.DB_URL,
  entities: [process.env.ENTITY_PATH],
  synchronize: true,
};
