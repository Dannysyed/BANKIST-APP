  
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Syed Daniyal',
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
  // 18005721370
};

const account2 = {
  owner: 'Syed Sania',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-09-27T17:01:17.194Z',
    '2021-10-28T23:36:17.929Z',
    '2021-10-30T10:51:36.790Z',
  ],
  // 1033
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

// creating username
//owner: 'Jonas Schmedtmann',

accounts.forEach(function(acc)
    {
      acc.username=acc.owner.toLowerCase().split(' ').map(map=>map[0]).join('')
    })
// console.log(accounts);
///
//validating
let currentaccount;
let timer
btnLogin.addEventListener('click',function(e){
  e.preventDefault()
  currentaccount=accounts.find(fin=>fin?.username===inputLoginUsername.value)
  // console.log(currentaccount);
  if(currentaccount.pin===Number(inputLoginPin.value))
  {
    containerApp.style.opacity=100;
    labelWelcome.innerHTML=`Welcome ${currentaccount.owner}`
    update()
    if(timer)clearInterval(timer)
    timer= time_out()

  }
  inputLoginUsername.value=''
  inputLoginPin.value=''
})
//updateui
let update=function()
{
  inter(currentaccount)
    summary(currentaccount)
    bal(currentaccount)


}
//function fo get_today
let two_day=function(date)
{
  let current=(date1,date2)=>Math.round(Math.abs(date2-date1)/(1000*60*60*24))
  let days=current(new Date(),date)
  if (days===0)return 'today'
  if (days===1)return 'YESTERDAY'
  if (days>2)return 'few days ago'
  console.log(days);
  let day=String(date.getDate()).padStart(2,0)
  let month=String(date.getMonth()+1).padStart(2,0)
  let year=date.getFullYear()
  return `${day}/${month}/${year}`
}

//adding html
let inter=function(acc,sort=false)
{
  containerMovements.innerHTML=''
//  let mor=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements
//  let mor=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements;
// console.log(acc.movements);
 let mor=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements;

 mor.forEach(function(mov,i)
  {
    let datt=new Date(acc.movementsDates[i]) 
   let some= two_day(datt)

  
    let move=mov>0?'deposit':'withdrawal'
    let html=`<div class="movements">
    <div class="movements__row">
      <div class="movements__type movements__type--${move}">${i+1} deposit</div>
      <div class="movements__date">${some}</div>
      <div class="movements__value">${mov}$</div>
    </div>`
  containerMovements.insertAdjacentHTML("afterbegin",html)
  })
}
let dat=new Date()
let day=String(dat.getDate()).padStart(2,0)
let month=String(dat.getMonth()+1).padStart(2,0)
let year=dat.getFullYear()
let some=`${day}/${month}/${year}`
labelDate.textContent=some
// deposit
let summary=function(acc)
{
let dep=acc.movements.filter(fil=>fil>0).reduce((acc,val)=>acc+val)
let out=Math.abs(acc.movements.filter(fil=>fil<0).reduce((acc,val)=>acc+val))
let int=acc.movements.filter(fil=>fil>0).map((val)=>val*acc.interestRate/100).filter(fil=>fil>1).reduce((acc,val)=>acc+val)

labelSumIn.textContent=dep
labelSumOut.textContent=out
labelSumInterest.textContent=int
console.log(dep,out);
}
//Balance
let bal=function(acc)
{
  let Balance=acc.movements.reduce((accu,val)=>accu+val)
  acc.Balance=Balance
  labelBalance.textContent=`${Balance}$`

}


console.log(currentaccount);
//transfer 18002669970
btnTransfer.addEventListener('click',function(e)
{
  e.preventDefault()
  let amount=Number(inputTransferAmount.value)
 let transfer=accounts.find(fin=>fin.username==inputTransferTo.value)
 if(transfer&&currentaccount.Balance>0&&inputTransferAmount.value>0&&transfer?.username!==currentaccount.username)
  {
    transfer.movements.push(amount)
    currentaccount.movements.push(-amount)
    
    currentaccount.movementsDates.push(new Date().toISOString())
    transfer.movementsDates.push(new Date().toISOString())
    update()
    if (timer)clearInterval(timer)
    timer=time_out()

    inputTransferAmount.value=''
    inputTransferTo.value=''

    
  }
})
btnLoan.addEventListener('click',function(e)
{
  e.preventDefault()
  let loan=Number(inputLoanAmount.value)
  console.log(loan>0);
  if(currentaccount.Balance>10%loan)
  {
    currentaccount.movements.push(loan)
    currentaccount.movementsDates.push(new Date().toISOString())

    update()



  }
})
// let sorted=true
// btnSort.addEventListener('click',function()
// {
//   inter(currentaccount.movements,!sorted)
//   sorted=!sorted
// })
let sorted=false
btnSort.addEventListener('click',function()
{

  inter(currentaccount,!sorted)
  sorted=!sorted
  
})
btnClose.addEventListener('click',function(e)
{
  e.preventDefault()
  if(inputCloseUsername.value==currentaccount?.username&&Number(inputClosePin.value)==currentaccount?.pin)
  {
  containerApp.style.opacity=0;  
  labelWelcome.innerHTML=`GoodNIght ${currentaccount.owner}`


  }
})
let time_out=function()
{
  let time=350
 let interval= setInterval(function()
  {
    
     let hour=String(Math.trunc(time/60)).padStart(2,0)
     let min=String(time%60).padStart(2,0)
    labelTimer.textContent=`${hour}:${min}`
    if(time==0)
    {
      clearInterval(interval)
      containerApp.style.opacity=0;  
      labelWelcome.innerHTML=`GoodNIght ${currentaccount.owner}`
    }
    time--
  }, 1000)
  return interval
}




