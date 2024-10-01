// NOTE: When installing node-fetch, I had to use "npm install node-fetch@2" instead of
//       "npm install node-fetch". This is because the older version still supports common JS modules,
//       whereas the newer one does not. Under the newer version, this line will cause an error in jest.
const fetch = require("node-fetch");

// Entry point
const isWebsiteAlive = (callback) =>
{
    fetch("http://example.com")
        .then(throwOnInvalidResponse)
        .then((resp) => resp.text())
        .then((text) =>
        {
            processFetchSuccess(text, callback);
        })
        .catch((err) =>
        {
            processFetchError(err, callback);
        });
};

const throwOnInvalidResponse = (resp) =>
{
    if (!resp.ok)
    {
        throw Error(resp.statusText);
    }

    return resp;
};

// Entry point
const processFetchSuccess = (text, callback) =>
{
    if (text.includes("illustrative"))
    {
        callback(null, { success: true, status: "ok" });
    }
    else
    {
        callback(new Error("missing text"), { success: false, status: "missing text" });
    }
};

// Entry point
const processFetchError = (err, callback) =>
{
    callback(err, { success: false, status: err });
};

module.exports =
{
    isWebsiteAlive,
    processFetchSuccess,
    processFetchError
};
