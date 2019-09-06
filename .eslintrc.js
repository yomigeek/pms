module.exports =  {
    "extends": "airbnb",
    "rules": {
        "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
    }
};
