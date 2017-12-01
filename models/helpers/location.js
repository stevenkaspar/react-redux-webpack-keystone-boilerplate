let setGoogleLocation = async function(next){
  try {
    await new Promise((resolve, reject) => {
      this._.location.googleLookup('US', 'overwrite', (err, location, result) => {
        if(err) return reject(err)
        resolve(result)
      })
    })
    next()
  }
  catch(err){
    next(err)
  }
}


module.exports.setGoogleLocation = setGoogleLocation
