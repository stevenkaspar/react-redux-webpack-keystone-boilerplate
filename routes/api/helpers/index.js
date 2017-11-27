let authErrResponse = ({res, status = 404, data = {}}) => (
  res.status(status).jsonp({
    error:   'You must be signed in to do that',
    success: false,
    data
  })
)

let errResponse = ({err, res, status = 500, data = {}}) => {

  console.log(err)

  return res.status(status).jsonp({
    error:   err.message,
    success: false,
    data
  })
}

let successResponse = ({res, data, status = 200}) => (
  res.status(status).jsonp({
    error:   '',
    success: true,
    data
  })
)

module.exports.authErrResponse = authErrResponse
module.exports.errResponse     = errResponse
module.exports.successResponse = successResponse
