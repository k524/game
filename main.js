(() => {
    const container = document.getElementById('container');
    let count = 0;
    let height;
    let form = createForm();

    container.append(createStartPage())
    container.append(form.form);

    function createStartPage() {
        let descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');
        
        let title = document.createElement('h1');
        title.textContent = "Memory Master";

        let rules = document.createElement('p');
        rules.innerHTML = `
        <p class="descr">"Memory Master" - это увлекательная игра на развитие памяти и внимательности. Ваша задача - найти все пары чисел на игровом поле за ограниченное время.</p>
        <p class="descr"><strong>Правила игры:</strong></p>
        <p class="descr">1. <strong>Настройка игры:</strong> В начале игры вам предлагается ввести количество строк и столбцов игрового поля. Игровое поле всегда квадратное, поэтому количество строк равно количеству столбцов. Введите четное число от 2 до 10 и нажмите кнопку "Начать игру".</p>
        <p class="descr">2. <strong>Игровое поле:</strong> Игровое поле состоит из карт, расположенных в виде сетки, количество которых равно квадрату введенного числа. Каждая карта имеет пару с одинаковым числом, которые случайным образом распределены по игровому полю.</p>
        <p class="descr">3. <strong>Ход игры:</strong> Нажмите на любую карту, чтобы открыть число. Нажмите на вторую карту, чтобы попытаться найти пару для первой. Если числа на двух открытых картах совпадают, они остаются открытыми. Если числа не совпадают, обе карты снова закрываются после небольшого задержки. Повторяйте попытки, пока не откроете все пары.</p>
        <p class="descr">4. <strong>Ограничение по времени:</strong> У вас есть 60 секунд, чтобы открыть все пары чисел. Если время истекает, игра заканчивается.</p>
        <p class="descr">5. <strong>Повтор игры:</strong> После завершения игры, вы можете нажать кнопку "Сыграть ещё раз", чтобы попробовать снова.</p>
        <p class="descr">6. <strong>Условия завершения:</strong> Игра завершается либо после открытия всех пар чисел, либо по истечении времени.</p>
    `;
        descriptionDiv.classList.add('descriptionDiv');
        title.classList.add('title_start_page');
        rules.classList.add('rules');
        
        descriptionDiv.append(title);
        descriptionDiv.append(rules);

        return descriptionDiv;
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    function createForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let btn = document.createElement('button');
        btn.disabled = true;

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите количество строк по вертикали/горизонтали';
        buttonWrapper.classList.add('input-group-append');
        btn.classList.add('btn', 'btn-primary');
        btn.textContent = 'Начать игру';

        input.addEventListener('input', function() {
            if (!input.value) {
                btn.disabled = true;
            }
            else {
                btn.disabled = false;
            }
        })

        btn.addEventListener('click', function() {
            game(input.value);
        })

        buttonWrapper.append(btn);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            btn
        };
    };

    function game(lines) {
        function stopGame() {
            ul.remove();
            buttonDiv.remove();
            descriptionDiv.append(rules);
            container.append(form.form);
        }
        if ((lines < 2) || (lines > 10) || ((lines % 2) !== 0))  {
            lines = 4;
        };
        const descriptionDiv = document.querySelector('.descriptionDiv');
        const rules = document.querySelector('.rules');

        form.form.remove();
        rules.remove();

        let button = document.createElement('button');
        let ul = document.createElement('ul');
        let buttonDiv = document.createElement('div');

        button.classList.add('btn', 'btn-reset');
        ul.classList.add('cards', 'list-reset');

        button.addEventListener('click', function() {
            stopGame();
        });

        button.textContent = 'Сыграть ещё раз';
        // button.disabled = true;

        buttonDiv.classList.add('button-div');

        let cardStartArray = [];
        for (let i = 1; i <= lines**2; i++) {
            cardStartArray.push(i)
        };
    
        cardStartArray = shuffle(cardStartArray);

        let cardEndArray = [];
        let openedNumber = [];

        container.append(ul);
        container.append(buttonDiv);
        buttonDiv.append(button);

        for (let i = 1; i <= lines**2; i++) {
            let card = document.createElement('li');
            card.classList.add('card');
            cardEndArray.push(cardStartArray[i - 1] % (lines**2/2) + 1);
            card.addEventListener('click', function() {
                if (card.textContent !== '') {
                    return
                };
            let currentNumber = cardEndArray[i - 1];
            if ((openedNumber[0] !== openedNumber[1]) && (openedNumber.length === 2)) {
                for (let y = 0; y < lines**2; y++) {
                    if ((ul.children[y].textContent === String(openedNumber[0])) || (ul.children[y].textContent === String(openedNumber[1]))) {
                        ul.children[y].textContent = '';
                    }; 
                };
                openedNumber.splice(0,2);
                count -= 2;
            };
            if ((openedNumber[0] === openedNumber[1]) && (openedNumber.length === 2)) {
                openedNumber.splice(0,2);
            };
            card.textContent = currentNumber;
            count++;
            if (count === lines**2) {
                count = 0;
                button.disabled = false;
            };
            openedNumber.push(currentNumber);
            });
            height = 400/lines;
            card.style.height = String(height) + 'px';
            card.style.width = String(height) + 'px';
            card.style.marginBottom = String(height/2) + 'px';
            card.style.marginRight = String((700 - height*lines)/(lines - 1)) + 'px';
            card.style.fontSize = String(height/2) + 'px';
            card.style.paddingTop = String(height/5) + 'px';
            card.style.paddingBottom = String(height/5) + 'px';
            if ((i % lines) === 0) {
                card.style.marginRight = '0';
            }
            ul.append(card);
        };
       window.setTimeout(stopGame, 60000);
    };
})();