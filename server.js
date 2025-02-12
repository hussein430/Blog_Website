import express from "express";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// access fot the public folder
app.use(express.static("public"));

// array storage for user posts
let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
    res.render("form.ejs", { post: null }); 
  });
  

  app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render("form.ejs", { post: post }); 
  });
  

app.get('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect("/");
  });
  

app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, info } = req.body;
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).send("Post not found");
  }
  posts[postIndex].title = title;
  posts[postIndex].info = info;
  res.redirect("/");
});

app.post("/post", (req, res) => {
  const { title, info } = req.body;

  const newPost = {
    id: generateId(),
    title: title,
    info: info,
    date: getCurrentDate(),
  };

  posts.push(newPost); // Store the new post in the array
  res.redirect("/");
});

app.listen(port, () => {
  console.log("the app is running on port " + port);
});

// Generate unique ID for posts
let idCounter = 1;
function generateId() {
  return idCounter++;
}

// Get Today date
function getCurrentDate() {
  return new Date().toLocaleDateString();
}
