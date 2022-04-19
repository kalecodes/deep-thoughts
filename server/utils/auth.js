const jwt = require('jsonwebtoken');

// optionally, tokens can be given an expiration date and secret to sign the token with.
// the secret has nothing to do with encoding, it simply enable the server to verify whether it recognizes the token
const secret = 'mysecretsshhhh';
const expiration = '2h';

module.exports = {
    // exports a user object and will add the payload properties to the token.
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    // verify JWT in headers
    authMiddleware: function({ req }) {
        // allows token to be set via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        // if not token, return request object as is
        if (!token) {
            return req;
        }
        
        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated request object 
        return req;
    }
};