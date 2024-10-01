/**
 * @jest-environment jest-environment-jsdom
 */
//(the above is required for window events)
const fs = require("fs");
const path = require("path");

// NOTE: To get this line to import properly, you need to install the Dom Testing Library via
//       the terminal command: npm install @testing-library/dom
//       The older way (npm install dom-testing-library) installs a deprecated version and gives you a warning to use the new way.
const { fireEvent, findByText, getByText } = require("@testing-library/dom");

require("../8 - Events/Click Listener/8 - IndexHelper.js");

const loadHtml = (fileRelativePath) =>
{
    //const filePath = path.join(__dirname, "index.html");
    const filePath = "../Ch06/8 - Events/Click Listener/index.html";
    const innerHTML = fs.readFileSync(filePath);
    document.documentElement.innerHTML = innerHTML;
    return document.documentElement;
};

const loadHtmlAndGetUIElements = () =>
{
    const docElem = loadHtml("index.html");
    const button = getByText(docElem, "click me", { exact: false });
    return { window, docElem, button };
};

describe("index helper", () =>
{
    test("dom test lib button click triggers change in page", () =>
    {
        const { window, docElem, button } = loadHtmlAndGetUIElements();
        fireEvent.load(window);

        fireEvent.click(button);

        //wait until true ot timeout in 1 sec
        expect(findByText(docElem, "clicked", { exact: false })).toBeTruthy();
    });
});
