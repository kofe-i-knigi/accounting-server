module.exports = {
  development: {
    dbUri: 'postgres://postgres:password@localhost:5432/kik',
    jwtSecret: 'sdfsd0fj3mvqvmq29835yq3znrupa93rspv95sesp45naa3n4',
    registrationToken: 'asd0345jmsdfmp03j45fp3qufnsdparmap3854adsp89'
  },

  production: {
    dbUri: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT,
    registrationToken: process.env.REG_TOKEN
  },

  test: {
    dbUri: 'postgres://postgres:password@localhost:5432/kik_test',
    jwtSecret: 'sdfsd0fj3mvqvmq29835yq3znrupa93rspv95sesp45naa3n4',
    registrationToken: 'asd0345jmsdfmp03j45fp3qufnsdparmap3854adsp89'
  },

  admin: {
      password: 'lady8ug'
  }
};
