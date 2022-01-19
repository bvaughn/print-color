# print-color
Helper utility for printing colored text in Node or the Browser.

This library was inspired by `chalk`. I wrote it because I often want to bounce between Node (Jest) and the browser when debugging a problem, and `chalk` only supports Node.

## Usage example
```js
import {bold, red} from 'print-color';

red('This text will be red.');
red.bold('This text will be red and bold');
bold.red('This text will also be red and bold');
```

## Environments
This utility works in the browser:

<img width="114" alt="Screen Shot of print-color demo in Node terminal" src="https://user-images.githubusercontent.com/29597/150039892-793751cb-eb80-49f1-8c9e-7f3a2450bff4.png">

It also works in Node:

<img width="104" alt="Screen Shot of print-color demo in Chrome console" src="https://user-images.githubusercontent.com/29597/150039894-99155523-7acc-4e37-8651-2193dfd687fa.png">
