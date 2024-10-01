// NOTE: When installing node-fetch, I had to use "npm install node-fetch@2" instead of
//       "npm install node-fetch". This is because the older version still supports common JS modules,
//       whereas the newer one does not. Under the newer version, this line will cause an error in jest.
const fetch = require("node-fetch");

// Callback version
const isWebsiteAliveWithCallback = (callback) =>
{
    const website = "http://example.com";
    fetch(website)
        .then((response) =>
        {
            if (!response.ok)
            {
                // How can we simulate this network issue?
                throw Error(response.statusText);
            }

            return response;
        })
        .then((response) => response.text())
        .then((text) =>
        {
            if (text.includes("illustrative"))
            {
                callback(null, { success: true, status: "ok" });
            }
            else
            {
                // How can we test this path?
                throw new Error("text missing");
            }
        })
        .catch((err) =>
        {
            // How can we test this exit point?
            callback(err);
        });
};


// Await version
const isWebsiteAliveWithPromises = async () =>
{
    try
    {
        const resp = await fetch("http://example.com");
        if (!resp.ok)
        {
            // How can we simulate a non-ok response?
            throw resp.statusText;
        }

        const text = await resp.text();
        const included = text.includes("illustrative");
        if (included)
        {
            return { success: true, status: "ok" };
        }

        // How can we simulate different website content?
        throw new Error("text missing");
    }
    catch (err)
    {
        throw err;
    }
};

module.exports = {
    isWebsiteAliveWithCallback,
    isWebsiteAliveWithPromises,
};
