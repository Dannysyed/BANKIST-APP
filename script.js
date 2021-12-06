  
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-09-27T17:01:17.194Z',
    '2021-10-25T23:36:17.929Z',
    '2021-10-26T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-07-12T10:51:36.790Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// two days ago
let two_days=function(date)
{
  let passday=(date1,date2)=> Math.round(Math.abs(date2-date1)/(1000*60*60*24))
  let dayss=passday(new Date(),date)
  console.log(`${dayss}aa`);
  if(dayss===0) return 'today'
  if(dayss===1) return 'yesterday'
  if(dayss>1) return 'few days'


  let day=`${date.getDate()}`.padStart(2,0 )
 let month=date.getMonth()+1
 let years=date.getFullYear()
 return `${day}/${month}//${years}`

}

let movements=function(acc,sort=false)
{
  containerMovements.innerHTML='';
  let mor=sort?acc.movements.slice().sort((a,b)=>a-b) : acc.movements;

 mor.forEach(function(mov,i){
 let type=mov>0?'deposit':'withdrawal'
 let date=new Date(acc.movementsDates[i])
 let newdate=two_days(date)
 
  console.log(mov,i);
  let html=
    `<div class="movements">
     <div class="movements__row">
     <div class="movements__type movements__type--${type}">${i+1} ${type} </div>
     <div class="movements__date">${newdate}</div>
    <div class="movements__value">${mov}$</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin',html)
})
}
// movements(account1.movements)
let func=function(acc)
{
acc.forEach(function(own){
 own.username=own.owner
 .toLowerCase().split(' ').map(mov=>mov[0]).join('')

})}
func(accounts);
console.log(accounts);
let total=function(tot)
{
 let Balance= tot.movements.reduce(function(acc,val)
  {
    return acc+val
  },0)
  tot.Balance=Balance
  labelBalance.textContent=`${Balance}$`
  // console.log(ac);
  // labelBalance.innerHTML=' '
  // let html= ` <p class="balance__value">Balance:${ac}$</p>`
  // labelBalance.insertAdjacentHTML('afterbegin',html)
}
total(account1)
let checksummary=function(dep)
{
  let depo=dep.movements.filter(val=>val>0).reduce((acc,val)=>acc+val)
  let out=dep.movements.filter(val=>val<0).reduce((acc,val)=>acc+val)
  let interest=dep.movements.filter(val=>val>0).map(val=>val*dep.interestRate/100).filter(rate=>rate>1).reduce((acc,val)=>acc+val)
  console.log(depo);
  console.log(out);
  labelSumIn.textContent=`${depo}$  `
  labelSumOut.textContent=`${out}$`
  labelSumInterest.textContent=`${interest}$`
}
checksummary(account1)
//ui
let updateUi=function(){
  movements(currentacc)
  total(currentacc)
  checksummary(currentacc)
}
//event handler
let timeout=function()
{
  let time=350

  let timer=setInterval(function()
  {
    let min=String(Math.trunc(time/60)).padStart(2,0)   
    let sec=time%60
    labelTimer.textContent=`${min}:${sec}`;
    //
  
    if(time==0)
    {
      clearInterval(timer)
      labelWelcome.textContent=`welcome  login `  
      //display ui
      containerApp.style.opacity=0;  
  
    }
    time--

  
  },1000)
  return timer
}

let currentacc;
let timer
btnLogin.addEventListener('click',function(a)
{
  a.preventDefault()
  currentacc =accounts.find(acc=>acc.username==inputLoginUsername.value)
  console.log(currentacc);
if(currentacc?.pin===Number(inputLoginPin.value)){

  //display welcome
  labelWelcome.textContent=`welcome ${currentacc.owner.split(' ')[0]}`  
  //display ui
  containerApp.style.opacity= 100;  
  inputLoginUsername.value=inputLoginPin.value=''
  // inputLoginPin.value=blur(' ')
  //display movement
  updateUi()
  if(timer) clearInterval(timer)
    timer=timeout()
 
}



  console.log('login');
})
//transfer//
btnTransfer.addEventListener('click',function(e){
  e.preventDefault()
  const amont=Number(inputTransferAmount.value);
  let transfer=accounts.find(acc=>acc.username==inputTransferTo.value)
//  let pull=.movements.pop(amont)
//  console.log(account2.movements);
  console.log(transfer);
  console.log(amont);
  inputTransferAmount.value=inputTransferTo.value=''
  if(amont>0&&currentacc.Balance>=amont&&transfer&&transfer?.username!==currentacc.username)
  {
    console.log(`${currentacc}####`);
    transfer.movements.push(amont)
    currentacc.movements.push(-amont)
    // current dates
    currentacc.movementsDates.push(new Date().toISOString())
    transfer.movementsDates.push(new Date().toISOString())
    updateUi()
    if(timer) clearInterval(timer)
    timer=timeout()

  }

})
//close acc
btnClose.addEventListener('click',function(e)
{
  e.preventDefault()
  console.log(currentacc.username);
  console.log(currentacc.pin);
  if(inputCloseUsername.value==currentacc.username&&Number(inputClosePin.value)==currentacc.pin)
  {
    let index=accounts.findIndex(val=>val.username===currentacc.username)
    console.log(index);
    accounts.splice(index,1)
  containerApp.style.opacity= 0;
  }
})
///loan

btnLoan.addEventListener('click',function(e)
{
  e.preventDefault()
  let amont=Number(inputLoanAmount.value)
  let any=currentacc.movements.some(val=>val>amont*0.1)
  if(any&&amont>0)
  {
    currentacc.movements.push(amont)
    updateUi()
  }

})
//sort
let sorted=false
btnSort.addEventListener('click',function()
{
  // if(sorted==false)
  // {
  // let sor=currentacc.movements.sort((a,b)=>a-b)
  //   updateUi()
  // }
  // else if(sorted==true)
  // {

  //   !sor
  //   updateUi()
  // }
  movements(currentacc.movements,!sorted)
  sorted=!sorted
  console.log(`sorted:${sorted}`);
  
})


//practise
// let arr=[12,21,123,23]
// let map=arr.map(function(val,i,arr)
// {
//   return arr[2]
// })
// let red=arr.reduce(function(acc,val,i,arr)
// {
//   console.log(`accis${acc} val is${val}`);
//   return acc+val
// })

// console.log(map);
// console.log(red);
// console.log(arr.flat(2));
// console.log(accounts);
// let redu=accounts.reduce((acc,val,i,arr)=>
// {
//   console.log(arr);
//   // console.log(val);
// })
// console.log(redu);

// let allmov=accounts.map((val,i,arr)=>val.movements)
// let flat=allmov.flat()
// console.log(flat);
//MOVEMENT
console.log(account1.movements);
//sort
//return<0=A,B
//return>0=B<A
// account1.movements.sort((a,b)=>
//   {
//     if(a>b)
//     return 1
//     else if (a<b)
//     return -1
//   })
//   console.log(account1.movements);
//   account1.movements.sort((a,b)=>
//   {
//     if(a<b)
//     return 1
//     else if (a>b)
//     return -1
//   })
//   console.log(account1.movements);
let move=Array.from(document.querySelectorAll('.movements__value') )
console.log(move.map(el=>(el.textContent.replace('$',''))));

labelBalance.addEventListener('click',function()
{
  let move=Array.from([...document.querySelectorAll('.movements__value')],(el=>(el.textContent.replace('$',''))))
  console.log(move);
})
//total deposit
let totaly=accounts.map(acc=>acc.movements)
let tota=totaly.flat()
console.log(tota);
console.log(tota.reduce((acc,val)=>
  acc+val,0));

  //deposit 1000 bill in bank
console.log(tota.filter(cal=>cal>1000).length);
let redd=tota.reduce((count,val)=>
val>1000?count+1:count
,0)
console.log(redd);

// let {dep,withs}=accounts.flatMap(acc=>acc.movements).reduce((acc,val)=>{ val>0?acc.dep+=val:acc.withs+=val
// return acc},{dep:0,withs:0})
// console.log(dep,withs);
//
// let [ob,ds]=accounts.flatMap(acc=>acc.movements).reduce((acc,val)=>{
// val>0?acc[0]+=val:acc[1]+=val  
// return acc},[2,3])
//   console.log(ob,ds);
//   //capital function
//This Is a Nice Title
// let arr=[]
// // let string='this is a nice title ok'
// let cap=function(string)
// {
//   let exp=['a','an','the','but']
//  let ss= string.split(' ')
//  .forEach(function(val)
//  {
   
//     if(exp.includes(val))
//   { 
//     arr.push(val); 
//   }
//   else{
    
//     arr.push(val.replace(val[0],val[0].toUpperCase()));

//   }
   
//  })
//  console.log(arr.join(' '));
// //   // console.log(ss);
// //   // console.log(r);
// // console.log(ss.map(val=>val.length>1?val[0].toUpperCase():val));

// }
// let l=prompt('enter')
// cap(l)
// let date=new Date()
// let day=`${date.getDate()}`.padStart(2,0 )
// let month=date.getMonth()+1
// let years=date.getFullYear()
// let some=`${day}/${month}/${years}`
// let get=function()
// {
// let date=new Date()
// let day=`${date.getDate()}`.padStart(2,0 )
// let month=date.getMonth()+1
// let years=date.getFullYear()
// let sec=dates.getSeconds()
// let some=`${day}/${month}/${years}/${sec}`

// labelDate.textContent=some
// }
// EXPERIMENTIONG API
let now=new Date();
let times={
    hour:'numeric',
    minute:'numeric',
    second:'numeric',
}
labelDate.textContent=new Intl.DateTimeFormat('en-US',times).format(now)





// setTimeout(get,9000);
// setInterval(get,1000);


// let type=mov>0?'deposit':'withdrawal'
///// timer////

////
// setInterval(time,1000)
// setTimeout(ss,1000)
