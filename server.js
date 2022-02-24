const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 3000;

const app = express();
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

const menus = require("./routes/menus");
const slider = require("./routes/slider");
const category = require("./routes/category");
const tags = require("./routes/tags");
const keyword = require("./routes/keyword");
const teams = require("./routes/teams");
const works = require("./routes/works");
const pages = require("./routes/pages");
const news = require("./routes/news");
const { db } = require("./connection");

db.authenticate().then(console.log("db is connected")).catch("err");

//----------------menus route--------------------------
app.post("/api/v1/admin/cms/menus", (req, res) => {
  menus.createMenu(req, res);
});
app.get("/api/v1/admin/cms/menus/:menus_id", (req, res) => {
  menus.getDetailMenuById(req, res);
});
app.put("/api/v1/admin/cms/menus/:menus_id", (req, res) => {
  menus.updateDetailMenuById(req, res);
});
app.delete("/api/v1/admin/cms/menus/:menus_id", (req, res) => {
  menus.deleteMenuById(req, res);
});
//-----------------END------------------------------

//-----------------------slider route--------------------------
app.post("/api/v1/admin/cms/slider", (req, res) => {
  slider.createSlider(req, res);
});
app.get("/api/v1/admin/cms/slider/:slider_id", (req, res) => {
  slider.getSliderDetailById(req, res);
});
app.get("/api/v1/admin/cms/slider", (req, res) => {
  slider.sliderPagination(req, res);
});
app.put("/api/v1/admin/cms/slider/:slider_id", (req, res) => {
  slider.updateSliderDetailById(req, res);
});
app.delete("/api/v1/admin/cms/slider/:slider_id", (req, res) => {
  slider.deleteSliderById(req, res);
});
//---------------------------END-------------------------

//-------------------------category route-------------------------
app.post("/api/v1/admin/cms/category", (req, res) => {
  category.createCategory(req, res);
});
app.get("/api/v1/admin/cms/category/:category_id", (req, res) => {
  category.getCategoryById(req, res);
});
app.get("/api/v1/admin/cms/category", (req, res) => {
  category.categoryPagination(req, res);
});
app.put("/api/v1/admin/cms/category/:category_id", (req, res) => {
  category.updateCategoryById(req, res);
});
app.delete("/api/v1/admin/cms/category/:category_id", (req, res) => {
  category.deleteCategoryById(req, res);
});
//-----------------------------END-----------------------------

//--------------------------Keywordsroute-----------------------------
app.post("/api/v1/admin/cms/keywords", (req, res) => {
  keyword.createKeywords(req, res);
});
app.get("/api/v1/admin/cms/keywords/:keyword_id", (req, res) => {
  keyword.getKeywordsById(req, res);
});
app.get("/api/v1/admin/cms/keywords", (req, res) => {
  keyword.keywordsPagination(req, res);
});
app.put("/api/v1/admin/cms/keywords/:keyword_id", (req, res) => {
  keyword.updateKeywordsById(req, res);
});
app.delete("/api/v1/admin/cms/keywords/:keyword_id", (req, res) => {
  keyword.deleteKeywordsById(req, res);
});
//----------------------------END------------------------------------

//-----------------------------tags route------------------------
app.post("/api/v1/admin/cms/tags", (req, res) => {
  tags.createTags(req, res);
});
app.get("/api/v1/admin/cms/tags/:tags_id", (req, res) => {
  tags.getTagsById(req, res);
});
app.get("/api/v1/admin/cms/tags", (req, res) => {
  tags.tagsPagination(req, res);
});
app.put("/api/v1/admin/cms/tags/:tags_id", (req, res) => {
  tags.updateTagsById(req, res);
});
app.delete("/api/v1/admin/cms/tags/:tags_id", (req, res) => {
  tags.deleteTagsById(req, res);
});
//--------------------------------END-------------------------------

//-----------------------teams route--------------------------------
app.post("/api/v1/admin/cms/teams", (req, res) => {
  teams.createTeams(req, res);
});
app.get("/api/v1/admin/cms/teams/:team_id", (req, res) => {
  teams.getTeamsById(req, res);
});
app.get("/api/v1/admin/cms/teams", (req, res) => {
  teams.teamsPagination(req, res);
});
app.put("/api/v1/admin/cms/teams/:team_id", (req, res) => {
  teams.updateTeamsDataById(req, res);
});
app.delete("/api/v1/admin/cms/teams/:team_id", (req, res) => {
  teams.deleteTeamById(req, res);
});
//-------------------------END---------------------------------------

//----------------------------works route-------------------------------
app.post("/api/v1/admin/cms/works", (req, res) => {
  works.createWorks(req, res);
});
app.get("/api/v1/admin/cms/works/:works_id", (req, res) => {
  works.getWorksById(req, res);
});
app.get("/api/v1/admin/cms/works", (req, res) => {
  works.worksPagination(req, res);
});
app.put("/api/v1/admin/cms/works/:works_id", (req, res) => {
  works.updateWorksDataById(req, res);
});
app.delete("/api/v1/admin/cms/works/:works_id", (req, res) => {
  works.deleteWorksById(req, res);
});
//-------------------------------END------------------------------------

//----------------------------pages route-------------------------------
app.post("/api/v1/admin/cms/pages", (req, res) => {
  pages.createPages(req, res);
});
app.get("/api/v1/admin/cms/pages/:page_id", (req, res) => {
  pages.getPagesById(req, res);
});
app.get("/api/v1/admin/cms/pages", (req, res) => {
  pages.pagesPagination(req, res);
});
app.put("/api/v1/admin/cms/pages/:page_id", (req, res) => {
  pages.updatePagesDataById(req, res);
});
app.delete("/api/v1/admin/cms/pages/:page_id", (req, res) => {
  pages.deletePagesById(req, res);
});
//-----------------------------END--------------------------------------
app.post("/api/v1/admin/cms/news", (req, res) => {
  news.createNews(req, res);
});
app.get("/api/v1/admin/cms/news/:news_id", (req, res) => {
  news.getNewsById(req, res);
});
app.get("/api/v1/admin/cms/news", (req, res) => {
  news.newsPagination(req, res);
});
app.put("/api/v1/admin/cms/news/:news_id", (req, res) => {
  news.updateNewsDataById(req, res);
});
app.delete("/api/v1/admin/cms/news/:news_id", (req, res) => {
  news.deleteNewsById(req, res);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
