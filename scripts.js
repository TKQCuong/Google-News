let pageCount = 1;
let articleRefresh = [];

const addScript = language => {
  let s = document.createElement("script");
  s.setAttribute(
    "src",
    `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}`
  );
  document.body.appendChild(s);
};

const userLanguage = window.clientInformation.language;
if (userLanguage == "vi") {
  addScript("vi");
}

const fetchNews = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=au&apiKey=9a1cfb14e2b64e3b86fd4d348755f05d&page=${pageCount}"
  );
  const data = await response.json();
  articleRefresh = articleRefresh.concat(data.articles);
  renderNews(articleRefresh);
  articleCount(articleRefresh);
  pageCount++;
};
fetchNews();

const renderNews = articles => {
  let html = "";
  articles.map(
    (
      { title, description, urlToImage, publishedAt, url, author, content },
      idx
    ) => {
      html += `<div class="card mb-3" style="max-width: 950px;">
            <div class="row no-gutters">
                <div class="col-md-8">
                    <div class="card-body">
                        <a href="${url}" class="card-title" target="_blank">${title}</a>
                        <p class="card-text">${description}</p>
                        <p class="card-text">${author}</p>
                        <p class="card-text">${moment(publishedAt).format(
                          "LL"
                        )}</p>
                        <p class="card-text">${moment(
                          publishedAt
                        ).fromNow()}</p>
                        <a data-toggle="collapse" href="#collapse-${idx}" data-target="#collapse-${idx}" class="collapsed" aria-expanded="false">
                    Read more</a> 
                        <p class="collapse" id="collapse-${idx}" style>${content}</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="${urlToImage}" onerror="this.onerror=null;this.src='img/imageEx.jpg';" class="card-img" alt="..."/>
                </div>
            </div>
        </div>  `;
      document.getElementById("main-content").innerHTML = html;
    }
  );
};

const articleCount = articles => {
  document.getElementById("storiesCount").innerHTML = articles.length;
};
