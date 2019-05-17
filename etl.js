const axios = require('axios');

(async () => {
  const { data: { token } } = await axios.post('http://localhost:3000/auth/register', {
    username: 'usernameEtl2',
    password: 'password'
  });
  console.log(token);
  //
  // try {
  //   const {data} = await axios.get('http://localhost:3000/auth', {
  //     headers: {authorization: `Bearer ${token}`},
  //   });
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }

  const { data } = await axios.post('http://localhost:3000/cats', {
    name: 'grumpy cat',
    lonely: false,
  }, {
    headers: { Authorization: `Bearer ${token}`},
  });

  console.log(data._id);

})();
