//ВИТОЧЕК СЕМЬСОТ

function gameBot() {
  this.interval = 1000;
  this.addJquery = addJquery;
  this.start = start;
  this.closeAllInfo = closeAllInfo;
  this.getButton = getButton;
  this.hasInfo = hasInfo;
  this.checkAddon = checkAddon;
  this.counter = 0;
  this.execute = execute;
  this.getSeconds = getSeconds;
  /**
   * Добавить jquery
   */
  function addJquery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  /**
   * Запустить бота
   */
  function start() {
    setInterval(execute, this.interval);
  }

  /**
   * Получить кнопку
   */
  function getButton() {
    return $('button:contains("Поехали!"),button:contains("Пауза")').eq(0);
  }

  /**
   * Закрыть все оповещалки
   */
  function closeAllInfo() {
    var elmArr = $('a:contains("Лидеры")').parent().next().find('span>div>div:not(:contains("Через"))')
    for (var i = 0; i < elmArr.length; i++) {
      var elm = elmArr.eq(i);
      elm.parent().find('a:contains("×")').get(0).click();
    }
  }

  /**
   * Есть ли оповещалки
   */
  function hasInfo() {
    return $('a:contains("Лидеры")').parent().next().find('span>div>div:contains("Через")').length > 0 && getSeconds() < 3;
  }

  /**
   * Список покупок
   */
  function getListToBuy() {
    var result = [];
    var list = $('a:contains("Лидеры")').parent().next().next().find('>div');
    for (var i = 0; i < list.length; i++) {
      var element = list.eq(i);
      var text = element.find('a div div div>span:eq(0)').text();
      var matchPerSec = text.match(/[+-]\d+\.\d+/i);
      if (matchPerSec) {
        var costPerSec = parseFloat(matchPerSec ? matchPerSec[0] : 0);
        var cost = parseFloat(element.find('div div div:last').text());
        result.push({
          text: text,
          costPerSec: costPerSec,
          cost: cost,
          val: cost / costPerSec
        });
      }
    }
    return result;
  }

  /**
   * Получить сколько секунд ждать
   */
  function getSeconds() {
    var min = 0;
    var messages = $('a:contains("Лидеры")').parent().next().find('span>div>div p');
    for (var i = 0; i < messages.length; i++) {
      var element = messages.eq(i);
      //'Через 0 секунд'.match(/Через (\d+) секунд/)[1]
      var match = element.text().match(/Через (\d+) секунд/i);
      if (match && match.length > 1) {
        var val = parseInt(match[1]);
        if (min == 0) {
          min = val;
        } else {
          min = Math.min(min, val);
        }
      }
    }
    return min;
  }
  /**
   * Механизм покупок
   */
  function checkAddon() {
    var list = getListToBuy();
    var max = 0;
    list.filter(function (item) {
      return item.val > 0;
    }).forEach(function (item) {
      if (max == 0) {
        max = item.val;
      } else {
        max = Math.max(max, item.val);
      }
    });



  }

  /**
   * Выполнение
   */
  function execute() {
    var button = getButton();
    if (hasInfo() && button.text() == "Пауза") {//игра идет
      this.counter = 0;
      button.click()
    }
    if (!hasInfo() && button.text() != "Пауза") {//пауза
      button.click()
    }
    if (button.text() != "Пауза") {//пауза
      this.counter++;
      if (this.counter >= 5) {
        this.counter = 0;
      }
    }
    closeAllInfo();
    checkAddon();
  }
}
var bot = new gameBot();
bot.addJquery();
setTimeout(function () {
  bot.start();
}, 2000);