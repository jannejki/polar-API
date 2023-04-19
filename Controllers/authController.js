const authController = {
    auth: (req, res) => {
        res.send('/auth');
    },
    
    login: (req, res) => {
        res.send('/login');
    },

    logout: (req, res) => {
        res.send('/logout');
    }
}

export default authController;