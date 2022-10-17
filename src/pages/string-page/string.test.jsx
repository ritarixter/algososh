import { reverseArr } from "./string.utils";
const str = [
  { 0: '1', elState: 'default' },
  { 0: '2', elState: 'default' },
  { 0: '3', elState: 'default' },
  { 0: '4', elState: 'default' },
]

const str1 = [
  { 0: 'h', elState: 'default' },
  { 0: 'e', elState: 'default' },
  { 0: 'l', elState: 'default' },
  { 0: 'l', elState: 'default' },
  { 0: 'o', elState: 'default' },
]

const str2 = [
  { 0: '1', elState: 'default' },
]

const str3 = [
  { 0: '', elState: 'default' },
]

const strRes = [
  [
    { 0: '1', elState: 'changing' },
    { 0: '2', elState: 'default' },
    { 0: '3', elState: 'default' },
    { 0: '4', elState: 'changing' },
  ],
  [
    { 0: '4', elState: 'modified' },
    { 0: '2', elState: 'changing' },
    { 0: '3', elState: 'changing' },
    { 0: '1', elState: 'modified' },
  ],
  [
    { 0: '4', elState: 'modified' },
    { 0: '3', elState: 'modified' },
    { 0: '2', elState: 'modified' },
    { 0: '1', elState: 'modified' },
  ]
]

const str1Res = [
  [
    { 0: 'h', elState: 'changing' },
    { 0: 'e', elState: 'default' },
    { 0: 'l', elState: 'default' },
    { 0: 'l', elState: 'default' },
    { 0: 'o', elState: 'changing' },
  ],
  [
    { 0: 'o', elState: 'modified' },
    { 0: 'e', elState: 'changing' },
    { 0: 'l', elState: 'default' },
    { 0: 'l', elState: 'changing' },
    { 0: 'h', elState: 'modified' },
  ],
  [
    { 0: 'o', elState: 'modified' },
    { 0: 'l', elState: 'modified' },
    { 0: 'l', elState: 'modified' },
    { 0: 'e', elState: 'modified' },
    { 0: 'h', elState: 'modified' },
  ]
]

const str2Res = [
  [
    { 0: '1', elState: 'changing' },
  ],
  [
    { 0: '1', elState: 'modified' },
  ],
]

const str3Res = [
  [
    { 0: '', elState: 'changing' },
  ],
  [
    { 0: '', elState: 'modified' },
  ],
]

describe("Алгоритм разворота строки работает корректно", function () {
it('Разворот строки с чётным количеством символов работает корректно', () => {
  expect(reverseArr(str)).toEqual(strRes);
});
it('Разворот строки с нечётным количеством символов работает корректно', () => {
  expect(reverseArr(str1)).toEqual(str1Res);
}); 
it('Разворот строки с одним символом работает корректно', () => {
  expect(reverseArr(str2)).toEqual(str2Res);
}); 
it('Разворот пустой строки работает корректно', () => {
  expect(reverseArr(str3)).toEqual(str3Res);
}); 
})