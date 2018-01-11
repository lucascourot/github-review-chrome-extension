const formatMessage = (prefix, title, org, repo, url) => {
    const icon = prefix === 'MEP' ? ':gear:' : ':information_source:';

    if (prefix === 'Squattage') {
        return `:pushpin: ${prefix} de \`${org}/${repo}\` en preprod pour "${title}" (${url})`;
    }

    return `${icon} ${prefix} \`${org}/${repo}\` "${title}" ${url}`;
};

const getMessageNode = () => document.getElementById('message');
const getPrefixNode = () => document.getElementById('prefix');
const renderView = results => {
    const {title, org, repo, url} = results[0];

    getPrefixNode().onchange = () => {
        getMessageNode().value = formatMessage(getPrefixNode().value, title, org, repo, url);
        getMessageNode().select();
    };
    getPrefixNode().onchange();
};

const chromeScriptExec = '(' + function () {
        return {
            title: document.querySelector('#partial-discussion-header > div.gh-header-show > h1 > .js-issue-title').textContent.trim(),
            org: document.querySelector('div.container.repohead-details-container > h1 > span.author > a').textContent.trim(),
            repo: document.querySelector('div.container.repohead-details-container > h1 > strong > a').textContent.trim(),
            url: document.URL,
        };
    } + ')()';

document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript({
        code: chromeScriptExec
    }, renderView);
});
