//TODO 1.       Реализовать проверку на существование номера vlan
//TODO 2.       Реализовать проверку на пустные значения
//TODO 3.       Реализовать сортировку по номеру при каждом добавлении новой строки
//TODO 4.       Сделать возможность редактирования каждой ячейки таблицы
//TODO 5.  [+]  Сделать пагинацию таблицы
//TODO 6.       Исправить ошибку при удалении нового добавленного vlan
//TODO 7.       Исправить ошибку при удалении всех строк с одной страницы (происходит при удалении последнего элемента на новой странице)
//TODO 8.       Добавить поиск по таблице
//TODO 9.       Добавить возможность редактирования/удаления несколько строк
//TODO 10.      При изменении диапазона строк заблокировать динамический выбор остальных строк
//TODO 11.      Выполнить: При изменении состояния главного чекбокса - изменять все дочерние
//TODO 12. [+]  Показывать значки редактирования/удаления только при наведении
//TODO 13.      Кнопка для добавления новых колонок с возможностью редактирования
//TODO 14.      Подключение к БД и хранение
//TODO 15.      Подключение к коммутатору
//TODO 16.      Проверка на максмальное кол-во vlan (максимальное кол-во - 4096)
//TODO 17.      При перемещении на другую страницу - сбрасывать изменения и состояние редактирования
//TODO 18. [+]  Добавлять строку при нажатии на "+", остальное как в другой таблице
//TODO 19.      [add_empty_row]: Подумать над пустыми значениями, вместо отсутствия ключей
//TODO 20.      Переход на новую страницу при добавлении строки за пределами видимой части (не переходит)
//TODO 21.      При создании пустой строки переключать состояние строки на редактируемое
//TODO 22.      Подтягивать все vlan в <select> в InterfaceTable из VlanTable
//TODO 23.      Исправить ошибку: При удалении вышестоящей строки, checkbox-ы снимаются (слетают)
//TODO 24.      Выполнить: При первичном рендере - загружать данные с сервера (conf.txt), при дальнешем - LocalDB/MongoDB => сохранять и отображать данные из БД
//TODO 25.      Выполнить: При изменении состояния дочернего чекбокса - изменять состояние главного на неполное
//TODO 26.      Выполнить: Множественное выделение строк (выделение цветом)
//TODO 27.      Выполнить: Выделение строки по нажатии на нее
//TODO 28.      Выполнить: Вкладка "Удаленный доступ"
//TODO 29.      Выполнить: Множественное добавление строк
//TODO 30.      Если какое-либо поле не может быть пустым, то выполнять проверку на наличие значения в поле
//TODO 31.      Переносить строку ввода на новую страницу (новая строка не находится в массиве данных)
//TODO 32.      Сохранять состояния таблиц при ререндеринге страницы (при переключении TAB сохранять состояния таблиц)
//TODO 33.      Исправить ошибку: При изменении протокола клонируются строки и вызывается ошибка
//TODO 34.
//TODO 35.