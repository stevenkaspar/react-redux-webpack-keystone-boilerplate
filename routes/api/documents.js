const keystone = require('keystone')
const S3 = require('aws-sdk/clients/s3')
const Readable = require('stream').Readable

const s3 = new S3({
  region: process.env.S3_REGION
})

const {documents} = require('../services/documents')

const { authErrResponse, errResponse, successResponse } = require('./helpers')

let getLoggedInUsers = async (req, res, next) => {
  if(!req.user) return authErrResponse({res})

  try {
    let documents = await documents.getLoggedInUsers(req, res, next)
    successResponse({res, data: { documents }})
  }
  catch(err){
    errResponse({err, res})
  }
}

let getDocumentsFileContents = (req, res, next) => {
  if(!req.user) return authErrResponse({res})

  keystone.list('Document').model.find({
    users: req.user.id,
    _id:   req.params.document_id
  }).exec((err, documents) => {
    if(err){
      return errResponse({err, res})
    }
    else if(documents.length === 0){
      return errResponse({err: new Error('File not found'), res})
    }
    const document = documents[0]
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key:    document.file.filename
    }
    const s3Stream = s3.getObject(params).createReadStream()
    res.setHeader('content-type', document.file.mimetype)
    res.setHeader('content-disposition', `attachment; filename="${document.label}.${document.file.mimetype.split('/').pop()}"`)
    // Listen for errors returned by the service
    s3Stream.on('error', (error) => {
      // NoSuchKey: The specified key does not exist
      console.error(error)
    })

    s3Stream.pipe(res)

  })
}


exports = module.exports =  {
  getLoggedInUsers,
  getDocumentsFileContents
}
