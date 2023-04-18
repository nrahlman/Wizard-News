const express = require("express");
const app = express();
// const morgan=require ("morgan")
const {list, find}=require("./postBank")
// const static=require("static")

// app.use(morgan('dev'));
app.use(express.static('public'))

app.get("/", (req, res) => {
const posts=list();

const html=`
<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
      <a href="/posts/${post.id}">${post.title}</a>
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`;


res.send(html)
});

app.get('/posts/:id', (req, res)=>{
  const id=req.params.id 
  const post=find(id);
  if (!post.id) {
    // If the post wasn't found, just throw an error
    throw new Error('Not Found')
  }
  const html=  `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <p>
            ${post.content}
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>
    </div>
  </body>
</html>`
  res.send(html)
})

const { PORT = 1338 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
