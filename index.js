//подключаем библиотеки
var express = require('express');
var bodyParser = require('body-parser');
const fs = require("fs");

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "hbs");

//подключаем файлы для нормальной работы css
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/Frames'));
app.use(express.static(__dirname + '/orbit-v1.0'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname));

app.get('/about', function(req, res) {
  res.sendFile(__dirname + "/orbit-v1.0/about.html");
});

app.get('/frames', function(req, res) {
  res.sendFile(__dirname + "/Frames/mainFrame.html");
});

//наш get и post запрос который принимает данные из формы
app.use('/', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400); //если ничего нет, вывводим страницу с ошибкой
  console.log(req.body); //выводим в консоль

  //берем наши данные из формы
  var Text = req.body.text;
  var Password = req.body.pasword;
  var Comment = req.body.comment;
  var Radio = req.body.radio;
  var Checkbox_Ajax = req.body.checkbox_Ajax;
  var Checkbox_JQuery = req.body.checkbox_JQuery;
  var Choose_this = req.body.choose_this;
  var Vibor = req.body.vibor;
  var Choose_file = req.body.choose_file;

  //отдаем данные из формы (рендерим) на новую страницу и выводим их там
  res.render("confirm.hbs", {
    text:Text,
    password:Password,
    comment:Comment,
    radio:Radio,
    checkbox_Ajax:Checkbox_Ajax,
    checkbox_JQuery:Checkbox_JQuery,
    choose_this:Choose_this,
    vibor:Vibor,
    choose_file:Choose_file
  });

  //сохранение данных в нужном нам виде для вывода в файл
    var login = "Логин " + Text;
    var parol = "\nПароль " + Password;
    var comen = "\nКомментарий " + Comment;
    var hochesh = "\nХотел бы вернуться на сайт еще раз? " + Radio;
    var znakon_a = "\nЗнаком с Ajax? " + Checkbox_Ajax;
    var znakon_j = "\nЗнаком с JQuery? " + Checkbox_JQuery;
    var budesh = "\nБудешь использовать этот прием ещё ?" + Choose_this;
    var viberesh = "\nИ что ты выберешь? " + Vibor;
    var fail = "\nА какой файл ты выбрал? " + Choose_file;

  //запись в файл
fs.writeFile('hello.txt', '');
var stream = fs.createWriteStream("hello.txt");
    stream.once('open', function(fd) {
    stream.write(login);
    stream.write(parol);
    stream.write(comen);
    stream.write(hochesh);
    stream.write(znakon_a);
    stream.write(znakon_j);
    stream.write(budesh);
    stream.write(viberesh);
    stream.write(fail);
    stream.end();
  });
});
//прослушивание нашего сервера 3000
app.listen(3000);
