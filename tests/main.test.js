const keystone   = require('../keystone')
const assert     = require('assert')
const request    = require('request')

const MONGO = 'mongodb://localhost/rrwkb-test-cases'

const ADMIN_USER = {
  email: 'test+adminuser@abzu.io',
  name: {
    first: 'Admin',
    last: 'User',
  },
  'password': 'Password1',
  is_admin:    true
}

const USER = {
  email: 'test+userone@abzu.io',
  name: {
    first: 'User',
    last: 'One',
  },
  'password': 'Password1',
}

let testRequest = ({jar = null, uri, body = {}, method = 'post'}) => {
  return new Promise((resolve, reject) => {
    request({
      jar,
      method,
      body,
      json:   true,
      url:    `http://localhost:3000${uri}`
    }, (err, response, body) => {
      if(err) return reject(err)
      resolve({err, response, body})
    })
  })
}

let keystone_started = false

let startup = () => {
  return new Promise((resolve, reject) => {
    if(keystone_started) return resolve()

    keystone.set('mongo', MONGO)
    keystone.start(() => {
      keystone_started = true
      resolve()
    })
  })
}

let shutdown = done => {
  keystone.mongoose.connection.db.dropDatabase(() => {
    done()
    // keystone.mongoose.connection.close().then(() => {
    //   if(keystone.httpServer)
    //     keystone.httpServer.close(done)
    // })
  })
}



let post = async function(uri, obj, status = 200, success = true){

  let {
    response, body
  } = await testRequest({
    uri:    `/api/${uri}`,
    method: 'post',
    body:   obj,
    jar:    this.jar
  })

  assert.strictEqual(response.statusCode, status)
  assert.strictEqual(body.success, success)

  return { response, body }
}

let patch = async function(uri, mods, status = 204){

  let {
    response, body
  } = await testRequest({
    uri:    `/api/${uri}`,
    method: 'patch',
    body:   mods,
    jar:    this.jar
  })

  assert.strictEqual(response.statusCode, status)

  return { response, body }
}

let get = async function(uri, status = 200, success = true){

  let {
    response, body
  } = await testRequest({
    uri:    `/api/${uri}`,
    method: 'get',
    jar:    this.jar
  })

  assert.strictEqual(response.statusCode, status)
  assert.strictEqual(body.success, success)

  return { response, body }
}

let signin = async function(user){
  let {
    response, body
  } = await testRequest({
    uri: '/api/signin',
    method: 'post',
    body: {
      email:    user.email,
      password: user.password,
    },
    jar:    this.jar
  })

  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(body.success, true)

  return { response, body }
}

let signout = async function(){
  let {
    response, body
  } = await testRequest({
    uri: '/api/signout',
    method: 'get',
    jar:    this.jar
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(body.success, true)

  return { response, body }
}



/*************************/
let signup = '\n\nSignup - Signin - Signout\n\n'
/*************************/
describe(signup, function(){

  this.jar = request.jar()

  this.timeout(30000)

  before(startup)

  after(shutdown)

  it('API - User should be created', async () => {
    let { body } = await post.bind(this)('users', USER)
    this.user = body.data.user
  })

  it('Confirm user with email', async () => {
    let user = await keystone.list('User').model.findOne({
      email: USER.email
    })
    assert.strictEqual(USER.email, user.email)
  })

  it('API - User should be logged in', async () => {
    await signin.bind(this)(USER)
  })

  it('API - User should receive itself after login', async () => {
    let user = await keystone.list('User').model.findOne({
      email: USER.email
    })
    let { body } = await get.bind(this)('user')
    assert.strictEqual(USER.email, body.data.user.email)
  })

  it('API - Sign out user', async () => {
    await signout.bind(this)()
  })

  it('API - User should get 404 response', async () => {
    let user = await keystone.list('User').model.findOne({
      email: USER.email
    })

    let { body } = await get.bind(this)('user', 404, false)
  })

})
