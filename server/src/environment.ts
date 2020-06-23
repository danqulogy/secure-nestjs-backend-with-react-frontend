export const environment = {
    mongo_url: 'mongodb+srv://admin:nanakwasi@cluster0-pv32b.mongodb.net/codecrawlers?retryWrites=false&w=majority',
    auth: {
        secret: '0BS6g1lUmIzskxGixUmbowTc0kefx7Of', // Change it to something secure and hard to crack
        jwtExpiresIn: '10h' // Jwt expiration duration should be shorter
    }
}