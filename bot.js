function gameBot() {
  this.addJquery = addJquery;
  this.start = start;
  this.closeAllInfo = closeAllInfo;
  this.getButton = getButton;
  this.hasInfo = hasInfo;
  this.checkAddon = checkAddon;
  this.counter = 0;
  this.game123 = execute;

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
    setInterval(execute, 2000);
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
    var elmArr = $('a:contains("Лидеры")').parent().next().find('span>div>div')
    for (var i = 0; i < elmArr.length; i++) {
      $(elmArr[i]).parent().find('a:contains("×")').get(0).click();
    }
  }

  /**
   * Есть ли сообщения об ошибке
   */
  function hasInfo() {
    return $('a:contains("Лидеры")').parent().next().find('span>div>div').length > 0;
  }

  /**
   * Механизм покупок
   */
  function checkAddon() {
    //$('span audio source[src]').last().parent().parent().parent().next().find('div').eq(0).find('a>div>div div div:eq(1) span:eq(0)').text()[0] =="+"
    //Список доступных опций
    // var addons = $('span audio source[src]').last().parent().parent().parent().next().find('div');
    // for (var i = 0; i < addons.length; i++) {
    //   var element = addons[i];

    // }
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
      if (this.counter >= 10) {
        closeAllInfo();
        this.counter = 0;
      }
    }
    checkAddon();
  }
}

var bot = new gameBot();
bot.start();
