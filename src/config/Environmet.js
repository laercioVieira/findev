module.exports = {
    FINDEV_BACKEND_PORT: 3333,
    FINDEV_MONGODB_USER: "findev",
    FINDEV_MONGODB_PASS: "findev",
    FINDEV_MONGODB_URL: "mongodb+srv://@dev-mongodb-cluster-lsvqt.gcp.mongodb.net/findev?retryWrites=true&w=majority",
    FINDEV_MONGODB_URL2: `mongodb+srv://$FINDEV_MONGODB_USER:$FINDEV_MONGODB_PASS@dev-mongodb-cluster-lsvqt.gcp.mongodb.net/test?retryWrites=true&w=majority`,
};