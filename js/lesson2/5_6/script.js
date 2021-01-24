"use strict";
/*
Реализовать основные 4 арифметические операции в виде функций с двумя параметрами.
Обязательно использовать оператор return.

Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции.
В зависимости от переданного значения операции выполнить одну из арифметических операций
и вернуть полученное значение (использовать switch).
*/

function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { return a / b; }

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'сложение':
            return add(arg1, arg2);
        case 'вычитание':
            return subtract(arg1, arg2);
        case 'умножение':
            return multiply(arg1, arg2);
        case 'деление':
            return divide(arg1, arg2);
    }
}