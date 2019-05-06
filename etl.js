const axios = require('axios');

(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/register', {
    username: 'username12249322229',
    password: 'password'
  });
  console.log(data);
  //
  // try {
  //   const {data} = await axios.get('http://localhost:3000/auth', {
  //     headers: {authorization: `Bearer ${token}`},
  //   });
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }

})();
