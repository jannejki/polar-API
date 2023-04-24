import jwt from 'jsonwebtoken';

const JWT = {
    create: (accessObject) => {
        const token = jwt.sign({ user: accessObject.x_user_id }, process.env.JWT_SECRET, { expiresIn: 1800});
        return token;
    },
    verify: async (token) => {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(new Date(decoded.exp * 1000).toLocaleString());
            console.log('verify true');
            return true;
        } catch (error) {
            console.log('verify error');
            console.log(error);
            return false;
        }
    },

    decode: (token) => {
        const decoded = jwt.decode(token);
        return decoded;
    },

    changeExpDate: (token) => {
        const decoded = jwt.decode(token);
        decoded.exp = 0;
        const newToken = jwt.sign(decoded, process.env.JWT_SECRET);
        return newToken;
    }
}

export default JWT;