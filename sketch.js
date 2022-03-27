var img;
var videoList = [];

function setup() {
  canvas = createCanvas(500, 700);
  background(255);
  
  $.ajax({ url: 'https://thecodingtrain.com/CodingChallenges/', success: function(data) { process(data); } });
}

function process(data) {
  var body = data.split("<body>");
  var backdrop = body[1].split("<div class=\"mobilenav-backdrop\" id=\"mobilenav-backdrop\">");
  var videoContainer = backdrop[1].split("<ul class=\"videos\">");
  videoList = videoContainer[1].split("<li>");
  videoList.splice(0, 1);
  videoList[videoList.length-1] = videoList[videoList.length-1].split("</ul>")[0];
  
  for (var i = 0; i<videoList.length; i++) {
    videoList[i] = videoList[i].split("</li>")[0];
    videoList[i] = videoList[i].substring(1, videoList[i].length);
  }
  
  getRandomElement();
  
}

function getRandomElement() {
    var randomIndex = floor(random(videoList.length-1));
    displayElement(randomIndex);
}

function displayElement(index) {
  //title
  var title = videoList[index].substring(videoList[index].indexOf("<h3>") + 4);
  title = title.substring(0, title.indexOf("</h3>"));
  
  fill(0);
  textSize(30);
  //textWrap(WORD);
  text(title, 0, 0, width);
  
  //image
  var imageURL = videoList[index].substring(videoList[index].indexOf("url(") + 4);
  imageURL = imageURL.substring(0, imageURL.indexOf(")\""));
  
  img = createImg(imageURL, "Insert Text here");
  img.position(0, 75);
  
  //desc
  var description = videoList[index].substring(videoList[index].indexOf("<p>") + 3);
  description = description.substring(0, description.indexOf("</p>"));
    
  fill(0);
  textSize(20);
  //textWrap(WORD);
  text("Desc: " + description, 0, height/2 + 25, width);
  
  //video link
  var link = videoList[index].substring(videoList[index].indexOf("<a href=\"https:") + 9);
  link = link.substring(0, link.indexOf("\" aria-label"));
  var clickableLink = createA(link, "Video URL", TOP);
  clickableLink.position(0, height/2 + 200);
  
  //Language to do challenge
  var languages = [
    "Java",
    "JavaScript",
    "C#",
    "C++",
    "Python"
  ];
  
  var indexToChoose = floor(random(languages.length-1));
  var lang = languages[indexToChoose];
  //console.log(lang);
  text("Language: " + lang, 0, height/2 + 300);
}
