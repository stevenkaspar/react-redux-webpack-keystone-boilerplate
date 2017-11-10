const keystone = require('keystone')
const Types    = keystone.Field.Types

const Document = new keystone.List('Document');

// You can uncomment this and update your .env file to use s3 storage
// const storage = new keystone.Storage({
//   adapter: require('keystone-storage-adapter-s3'),
//   s3: {
//     headers: {
//       'x-amz-meta-author': 'Steven', // add default headers; see below for details
//     },
//   },
//   schema: {
//     bucket: true, // optional; store the bucket the file was uploaded to in your db
//     etag: true, // optional; store the etag for the resource
//     path: true, // optional; store the path of the file in your db
//     url: true, // optional; generate & store a public URL
//   },
// })

Document.add({
	label:      { type: String, required: true, default: 'Document', initial: true },
  users:      { type: Types.Relationship, ref: 'User', many: false, initial: true },
  // file:       { type: Types.File, storage: storage, initial: true },
	date:       { type: Date, default: Date.now }
});


Document.defaultColumns = 'users, file'
Document.register()
