/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

// 'use strict';

// const movieDB = {
//     movies: [
//         "Логан",
//         "Лига справедливости",
//         "Ла-ла лэнд",
//         "Одержимость",
//         "Скотт Пилигрим против..."
//     ]
// };

// const adv = document.querySelectorAll('.promo__adv img'),
//       poster = document.querySelector('.promo__bg'),
//       genre = poster.querySelector('.promo__genre'), 
//       movieList = document.querySelector('.promo__interactive-list');

// adv.forEach (item => {
//     item.remove();
// })

// genre.textContent = "Драма";
// poster.style.backgroundImage = 'url(../img/bg.jpg)';

// movieList.innerHTML = "";

// movieDB.movies.sort();

// movieDB.movies.forEach((film, i) => {
//     movieList.innerHTML += `
//         <li class="promo__interactive-item">${i + 1} ${film}
//             <div class="delete"></div>
//         </li>
//     `;
// });

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

document.addEventListener('DOMContentLoaded', () => {       // событие, которое позволяет сначала построить DOM-структуру, а только после запустить скрипт
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'), 
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'), 
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {    // если newFilm = true, то создаём всё. вот тут "addInput.value;"" тип данных – строка. а если мы ничего не вводим, то это пустая строка, т.е false

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); // добавляем новый фильм в movieDB.movies
            sortArr(movieDB.movies);

            creatMovieList(movieDB.movies, movieList);
        }

        e.target.reset();

    });
    
    const deleteAdv = (arr) => {   // удаляем ненужную рекламу
        arr.forEach (item => {
            item.remove();
        });
    };
    

    const makeChanges = () => {
        genre.textContent = "Драма";

        poster.style.backgroundImage = 'url(../img/bg.jpg)';
    };


    const sortArr = (arr) => {
        arr.sort();
    };
    

    function creatMovieList (films, parent) {  // функция по созданию листа с фильмами
        parent.innerHTML = "";
        sortArr(films);
    
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => { // создаём вместилище информации для корзины, btn – корзинки, а i – это номер по порядку 
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                creatMovieList(films, parent); // используем рекурсию, чтобы при удалении нумерация оставалась по порядку
            });
        });
    }


    deleteAdv(adv);
    makeChanges();
    creatMovieList(movieDB.movies, movieList);

});

