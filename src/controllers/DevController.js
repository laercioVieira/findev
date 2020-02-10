const httpClient = require('axios');
const Dev = require('../models/DevModel');

module.exports = {
    async store(req, res) {
        const {
            username
        } = req.body;
        
        try {
            const response = await httpClient.get(`https://api.github.com/users/${username}`);
            const { name, bio, avatar_url: avatar } = response.data;
            
            const persistedUser = await Dev.findOne({user: username});
            if(persistedUser){
                return res.json(persistedUser);
            }
            
            const dev = await Dev.create({
                name: name || '(não informado)',
                user: username,
                bio,
                avatar
            });

            return res.json(dev);
        } catch (error) {
            return res.json({ok: false, error: error});            
        }
    }
};