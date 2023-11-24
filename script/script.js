
class PRESTimeline {

constructor(target, color) {
this.base = target;
this.color = color;
this.periodContainer = $(this.base).find('.periods-container');
this.cardContainer = $(this.base).find('.cards-container');
this.timelineNodeContainer = $(this.base).find('.timeline-container .timeline');
this._parseData();
this._initialColor();
this._generateTimeline();
this._setStateClasses();
this._assignBtn();
this._adjustPeriodContainer();
this._adjustCardContainer();
}

_parseData() {
let base = this.base;
let periods = $(base).find('.periods-container section');
for (let section of periods) {
  section.period = $(section).attr('period');
  section.index = $(section).index();
}
this.periodData = periods;
let data = $(base).find('.cards-container section');
for (let section of data) {
  section.period = $(section).attr('period');
  section.index = $(section).index();
}
this.cardData = data;
this.activePeriod = this.periodData[0];
this.activePeriodIndex = 0;
this.activeCard = this.cardData[0];
this.activeCardIndex = 0;
}

_setStateClasses() {
$(this.base).find('.periods-container section.active').removeClass('active');
$(this.base).find('.periods-container section.prev').removeClass('prev');
$(this.base).find('.periods-container section.next').removeClass('next');
$(this.activePeriod).addClass('active');
if ($(this.activePeriod).prev().length != 0) {
  $(this.activePeriod).prev().addClass('prev');
  $(this.base).find('.periods-container .btn-back').removeClass('hide');
} else {
  $(this.base).find('.periods-container .btn-back').addClass('hide');
}
if ($(this.activePeriod).next().length != 0) {
  $(this.activePeriod).next().addClass('next');
  $(this.base).find('.periods-container .btn-next').removeClass('hide');
} else {
  $(this.base).find('.periods-container .btn-next').addClass('hide');
}

$(this.base).find('.cards-container section.active').removeClass('active');
$(this.base).find('.cards-container section.prev').removeClass('prev');
$(this.base).find('.cards-container section.next').removeClass('next');
$(this.activeCard).addClass('active');
if ($(this.activeCard).prev().length != 0) {
  $(this.activeCard).prev().addClass('prev');
}
if ($(this.activeCard).next().length != 0) {
  $(this.activeCard).next().addClass('next');
}

$(this.base).find('.timeline li.active').removeClass('active');
$(this.timelineData[this.activeCard.index]).addClass('active');

let timelineB = $(this.base).find('.timeline-container .btn-back');
let timelineN = $(this.base).find('.timeline-container .btn-next');
if (this.activeCardIndex === 0) {
  timelineB.addClass('hide');
} else {
  timelineB.removeClass('hide');
}
if (this.activeCardIndex >= this.cardData.length - 1) {
  timelineN.addClass('hide');
} else {
  timelineN.removeClass('hide');
}
}

_generateTimeline() {
  let htmlWrap = '<ol></ol>';
  $(this.timelineNodeContainer).append(htmlWrap);
  let wrap = $(this.timelineNodeContainer).find('ol');
  let numNode = this.cardData.length;
  for (let i = 0; i < numNode; i++) {
    let c = this.cardData[i].color;
    let el = wrap.append('<li class="' + this.cardData[i].period + '" style="border-color: ' + c + '"></li>');
  }
  let nodeW = 200;
  wrap.css('width', nodeW * numNode - 16);
  let nodeList = $(this.base).find('.timeline ol li');
  this.timelineData = nodeList;
  }
  
_assignBtn() {
let periodPrev = $(this.base).find('.periods-container .btn-back');
let periodNext = $(this.base).find('.periods-container .btn-next');
periodPrev.click(() => {
  if (this.activePeriodIndex > 0) {
    this.activePeriodIndex -= 1;
    this.activePeriod = this.periodData[this.activePeriodIndex];
    this._chainActions('period');
    this._setStateClasses();
  }
  this._adjustPeriodContainer();
});
periodNext.click(() => {
  if (this.activePeriodIndex < this.periodData.length - 1) {
    this.activePeriodIndex += 1;
    this.activePeriod = this.periodData[this.activePeriodIndex];
    this._chainActions('period');
    this._setStateClasses();
  }
  this._adjustPeriodContainer();
});

let timelinePrev = $(this.base).find('.timeline-container .btn-back');
let timelineNext = $(this.base).find('.timeline-container .btn-next');
timelinePrev.click(() => {
  if (this.activeCardIndex > 0) {
    this.activeCardIndex -= 1;
    this.activeCard = this.cardData[this.activeCardIndex];
    this._chainActions('timeline');
    this._setStateClasses();
  }
  this._adjustCardContainer();
  this._adjustPeriodContainer();
});
timelineNext.click(() => {
  if (this.activeCardIndex < this.cardData.length - 1) {
    this.activeCardIndex += 1;
    this.activeCard = this.cardData[this.activeCardIndex];
    this._chainActions('timeline');
    this._setStateClasses();
  }
  this._adjustCardContainer();
  this._adjustPeriodContainer();
});

for (let i = 0; i < this.timelineData.length; i++) {
  $(this.timelineData[i]).click(() => {
    this.activeCardIndex = this.cardData[i].index;
    this.activeCard = this.cardData[this.activeCardIndex];
    this._chainActions('timeline');
    this._setStateClasses();
    this._adjustCardContainer();
    this._shiftTimeline();
  });
}
}

_initialColor() {
for (let i = 0; i < this.periodData.length; i++) {
  let p = this.periodData[i].period;
  this.periodData[i].color = this.color[p];
  let temp = this.periodData[i];
  $(temp).css('border-color', temp.color);
  $(temp).find('.year').css('color', temp.color);

  let sbstyle = document.createElement("style");
  document.head.appendChild(sbstyle);
  sbstyle.sheet.insertRule('li.' + p + '.active { background-color: ' + this.color[p] + ' !important } ', 0);
  sbstyle.sheet.insertRule('li.' + p + '::before { background-color: ' + this.color[p] + ' } ', 0);
  sbstyle.sheet.insertRule('li.' + p + '::after { background-color: ' + this.color[p] + ' } ', 0);
  }

  for (let i = 0; i < this.cardData.length; i++) {
    let p = this.cardData[i].period;
    this.cardData[i].color = this.color[p];
    let temp = this.cardData[i];
    $(temp).css('border-color', temp.color);
    $(temp).find('.year').css('color', temp.color);
  }
}

_adjustPeriodContainer() {
  let activeH = $(this.activePeriod).outerHeight();
  $(this.periodContainer).height(activeH);
  console.log('top adjusted');
}

_adjustCardContainer() {
  let activeH = $(this.activeCard).outerHeight() + 24;
  $(this.cardContainer).height(activeH);
  console.log('bot adjusted');
}

_shiftTimeline() {
  let timelineW = $(this.base).find('.timeline-container').outerWidth();
  let timelinePadding = 210;
  let timelineCenter = 300;
  let liWidth = 16;
  let activeNodeX = $(this.timelineData[this.activeCardIndex]).position().left;
  let finalPos = -activeNodeX + timelinePadding;
  $(this.timelineNodeContainer).css('left', finalPos);
  console.log(activeNodeX);
}

_chainActions(state) {
  switch (state) {
    case 'period':
      console.log('period');
      if (this.activePeriod.period != this.activeCard.period) {
        let ta = [];
        for (let i = 0; i < this.cardData.length; i++) {
          let temp = this.cardData[i];
          if (this.activePeriod.period === temp.period) ta.push(temp);
        }
        this.activeCard = ta[0];
        this.activeCardIndex = ta[0].index;
      }
      break;
    case 'timeline':
      console.log('timeline');
      if (this.activeCard.period != this.activePeriod.period) {
        let ta;
        for (let i = 0; i < this.periodData.length; i++) {
          let temp = this.periodData[i];
          if (this.activeCard.period === temp.period) ta = temp;
        }
        this.activePeriod = ta;
        this.activePeriodIndex = ta.index;
      }
      break;
  }
  this._shiftTimeline();
  this._adjustCardContainer();
}
}

