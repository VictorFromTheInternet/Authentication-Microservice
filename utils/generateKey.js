import crypto from 'crypto'

const randomKey = crypto.randomBytes(64).toString('hex')
console.log(randomKey)
