const app = require('./app')
const https = require('https')
const fs = require('fs')
const path = require('path')
const logger = require('./logging/logger')

const PORT = process.env.PORT || 8443

const httpsOptions = {
	key: fs.readFileSync(path.join(__dirname, 'certs', 'user-management-backend-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'user-management-backend-cert.pem')),
    ca: [fs.readFileSync(path.join(__dirname, 'certs', 'CA-cert.pem'))],
    requestCert: true,
    rejectUnauthorized:false
}

const server = https.createServer(httpsOptions, app)

server.listen(PORT, () => {
    logger.info(`started server on port ${PORT}`)
})