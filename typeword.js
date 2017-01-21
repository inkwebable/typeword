jQuery.fn.typeWord = function (options) {

    var settings;

    $.extend(settings = {
        words: ['I am a minimalist.', 'I am not a designer.', 'I am not a cowboy.', 'I am possibly an alien.', 'I am not a grumpy cat.', 'I am an advocate of actions speak louder than words!', 'I am possibly a robot.'],
        reWrites: 1,
        deleteSpeed: 50,
        addSpeed: 400,
        startDelay: 5000,
        deleteLetterSpeed: 50,
        delayStartAddingWords: 400,
        addLetterSpeed: 150,
        delayStartDeletingWord: 1500

    }, options);

    var changedMe = $(this);
    var random = settings.words;
    var word;
    var newLen = 0;
    var newWordLen = 0;
    var doThisMany = settings.reWrites;
    var text = changedMe.text();
    var wordLen = text.length;

    var remove = setTimeout(removeChar, settings.startDelay);

    if (settings.reWrites > settings.words.length) {
        doThisMany = settings.words.length;
    }

    function removeChar() {
        text = changedMe.text();
        text = text.substring(0, wordLen - 1);
        changedMe.text(text);
        wordLen--;
        if (wordLen <= 0) {
            var num = Math.floor(Math.random() * random.length);
            abortTimer();
            word = random[num];
            if (settings.reWrites > 1) {
                random.splice(num, 1);
            } else {

            }
            newWordLen = word.length;
            newLen = 0;
            console.log('delay start adding words ' + settings.delayStartAddingWords);
            var add = setTimeout(addChar, settings.delayStartAddingWords);
        } else {
            console.log('delete letter speed ' + settings.deleteLetterSpeed);
            remove = setTimeout(removeChar, settings.deleteLetterSpeed);
        }
    }

    function addChar() {
        text = changedMe.text();
        text += word.charAt(newLen);
        changedMe.text(text);
        newLen++;
        if (newLen >= newWordLen) {
            abortTimer();
            wordLen = changedMe.text().length;
            if (doThisMany > 1) {
                console.log('start Deleting word delay' + settings.delayStartDeletingWord);
                doThisMany--;
                remove = setTimeout(removeChar, settings.delayStartDeletingWord);
            }
        } else {
            console.log('add letter speed ' + settings.addLetterSpeed);
            add = setTimeout(addChar, settings.addLetterSpeed);
        }
    }

    function abortTimer() {
        clearTimeout(remove);
    }

};

