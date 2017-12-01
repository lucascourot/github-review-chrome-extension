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
        const result = results[0];
        const message = document.getElementById('message');

        const title = result.title.trim();
        const org = result.org.trim();
        const repo = result.repo.trim();
        const url = result.url.trim();

        message.value = `:gear: MEP \`${org}/${repo}\` "${title}" ${url}`;
        message.select();
    });
});
