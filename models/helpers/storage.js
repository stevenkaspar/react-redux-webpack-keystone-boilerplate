const keystone = require('keystone')
// You can uncomment this and update your .env file to use s3 storage
const storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    path: '/public',
    headers: {},
    publicUrl: function(file){
      return `https://SOMECLOUDFRONTSTRING.cloudfront.net/${file.filename}`
    }
  },
  schema: {
    bucket: true, // optional; store the bucket the file was uploaded to in your db
    etag: true, // optional; store the etag for the resource
    path: true, // optional; store the path of the file in your db
    url: true, // optional; generate & store a public URL
  },
})

module.exports = storage
