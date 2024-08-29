// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

// initiate the process
init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

// select all the elements in the DOM that are going to be used
function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}

/* Attaching three event listeners here:
  - a click event listener for each card
  - a click event listener to the close button
  - a resize event listener on the window
*/
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

/* When a card is clicked */
function onCardClick(card, i) {
  // set the current card
  currentCard = card;
  // add the 'clicked' class to the card, so it animates out
  currentCard.className += ' clicked';
  // animate the card 'cover' after a 500ms delay
  setTimeout(function() {animateCoverUp(currentCard)}, 500);
  // animate out the other cards
  animateOtherCards(currentCard, true);
  // add the open class to the page content
  openContent.className += ' open';
}


function animateCoverUp(card) {
  // get the position of the clicked card
  var cardPosition = card.getBoundingClientRect();
  // get the style of the clicked card
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  // update the content of the opened page
  var cardclassName=card.className;
  var cardcontent = getContentForCard(cardclassName);
  
  openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+cardcontent.para;
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    // update the scroll position to 0 (so it is at the top of the 'opened' page)
    window.scroll(0, 0);
    // set page to open
    pageIsOpen = true;
  }, 300);
}

function getContentForCard(cardClass) {
    var contents = {
        'card card-color-0 clicked': {
            title: '',
            imageSrc: '../pictures/t1.jpg',
            para: '大家好，我是随便起一个吧小组的曹凯淇。我在本组中主要负责文字稿件、音乐音效、小组汇报的部分按照自我介绍的惯例，我应该说自己性格开朗，喜欢交朋友，喜欢音乐（会弹吉他和一些民族弦乐器），也参加过歌手大赛，喜欢打羽毛球，是睿信院队的一员但是说完这些应该说点什么呢，讲讲我们创作这个网站的故事吧。最开始我们的设想是做一个有正反馈机制的教学网站。做一个人物，以及一个皮肤系统，你们可以通过答题来挣钱买皮肤，但这好像并不容易那用什么来激励你们学习呢。一天晚上，我问大家要不要加入剧情，一位组员开玩笑的发了一张截图，是修仙和C语言结合起来的小说设定。没想到大家一拍即合，我们可以用离谱但吸引人的剧情来推动大家的学习热情，于是，就诞生了你们看到的这个网站希望大家喜欢这个网站，并能从中真正学到知识，不光是看一乐'
        },
        'card card-color-1 clicked': {
            title: 'Another card title',
            imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-01.jpg',
            para: '19岁，来自中国四川，目前在北京理工大学软件工程专业就读大二，在“随便起一个吧”小组中负责文档编写与作业上传等。性格比较内向，偶尔伪装e人，兴趣爱好广而不精。喜欢音乐，流行、摇滚、R&B等都有涉猎，欧美、中文、韩文歌曲都爱听；喜欢美食，比起烹饪来说，在品鉴方面更在行；喜欢打球，主要是乒乓和羽毛球这类小球；喜欢动物，无论是小猫小狗还是仓鼠等等，深恶痛绝虐待动物。自认为团队合作能力不错，但有选择困难症等缺点。'
        },
        'card card-color-2 clicked': {
            title: 'This is card number three',
            imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-02.jpg',
            para: 'Hi！我是居雯惠，2023级睿信书院学生，现在在计算机学院软件工程专业就读。我的MBTI在intj和istj之间蹦跶，非常i的i人，但在努力变e中！我平时喜欢看综艺、追剧，有时候也会看一些经典的老电影，还喜欢跳舞、拍照，也爱摄影，喜欢参加各种活动，喜欢做学生工作。我在小组中承担网站编辑和视频剪辑的工作。在网站页面设计过程中提供我的一些意见，尽可能让网站页面更加美观；剪辑小组介绍视频宣传网站，让网站看上去更加有吸引力；编写C语言学习的教程，让每一个网站的使用者都能在快乐中学会C语言！很开心能和大家一起组队！'
        },
        'card card-color-3 clicked': {
            title: 'Last but not least',
            imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-03.jpg',
            para: '你好，我叫白钦宇，来自美丽的中美洲国家尼加拉瓜。我的家乡风景优美，拥有丰富的文化和历史背景，这些都在我成长过程中深深影响了我。 作为一个热爱技术的人，我从小就对计算机和编程充满了兴趣。编程不仅是一种技能，更是一种让我自由表达创造力的方式。通过编写代码，我能够构建出各种各样的项目，从小工具到大型系统，每一个项目都让我感到兴奋和充实。除了编程，我还是一名狂热的排球爱好者。排球不仅让我保持健康，还让我体验到了团队合作的力量。每一次比赛，我都在不断挑战自我，努力成为队伍中不可或缺的一员。我相信，编程和排球虽然看似不同，但两者都需要专注、耐心和毅力。'
        },
        'card card-color-4 clicked': {
            title: 'Last but not least',
            imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-03.jpg',
            para: '这是卡片5的内容。'
        }
    };
    return contents[cardClass];
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  // animate scale back to the card size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the card animates back in
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  // style the cover so it is in exactly the same position as the card
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  // style the cover to be the same color as the card
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  // calculate the scale and position for the card to fill the page,
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position card and size
  animateCoverBack(currentCard);
  // animate in other cards
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    // animate cards on a stagger, 1 each 100ms
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

var paragraphText = '<p>测试0</p>';
var paragraphText1 = '<p>测试2</p>';