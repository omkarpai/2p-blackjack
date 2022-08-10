require("dotenv").config();

const getPort = () => {
    return process.env.PORT ? process.env.PORT : 4545;
};

const ENV = {
    PORT: getPort(),
};
export default ENV;
