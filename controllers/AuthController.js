class AuthController {

    static login = async (req, res) => {
        const {email, password} = req.body;
        if (!(username && password)) {
            res.status(400).send();
        }
    };

    static logout = async (req, res) => {
        res.status(200).send({message: 'You are on the logout page'});
    };
}
function login(req, res) {
    
}

module.exports = AuthController