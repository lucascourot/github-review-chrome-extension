document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript({
        code: '(' + function () {
            return {
                title: document.querySelector('#partial-discussion-header > div.gh-header-show > h1 > .js-issue-title').textContent,
                org: document.querySelector('div.container.repohead-details-container > h1 > span.author > a').textContent,
                repo: document.querySelector('div.container.repohead-details-container > h1 > strong > a').textContent,
                url: document.URL,
            };
        } + ')()'
    }, (results) => {
        const messageElement = document.getElementById('message');
        const prefixElement = document.getElementById('prefix');

        const result = results[0];
        const title = result.title.trim();
        const org = result.org.trim();
        const repo = result.repo.trim();
        const url = result.url.trim();

        const refreshMessage = (prefix) => {
            const icon = prefix === 'MEP' ? ':gear:' : ':information_source:';
            messageElement.value = `${icon} ${prefix} \`${org}/${repo}\` "${title}" ${url}`;
            messageElement.select();
        };

        prefixElement.onchange = () => {
            refreshMessage(prefixElement.value);
        };

        refreshMessage(prefixElement.value);
    });
});
