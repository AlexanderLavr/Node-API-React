import { connection, connect } from 'mongoose';

export default (async () => {
    const url = 'mongodb+srv://alex:111111EST@cluster1-jyanq.mongodb.net/test?retryWrites=true&w=majority';
    connect(url, {
        useNewUrlParser: true,
        dbName: 'db'
    }).catch((e) => {
        console.log('Database connectivity error ', e)
    })
    const db: any = connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('connected');
    });
})();
