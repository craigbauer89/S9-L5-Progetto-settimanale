class Smartphone {
    private _firstname:string; // not needed but can add
    private _balance:number;
    private _minutes:number;
    private _calls:number; 

    constructor(firstname:string, balance:number, minutes:number, calls:number) {
        this._firstname = firstname;
        this._balance = balance;
        this._minutes = minutes;
        this._calls = calls;
    }

    get firstname():string {
            return this._firstname;       
    }

    get balance():number {
        return this._balance;       
    }
    get calls():number {
        return this._calls;       
    }

    get minutes():number {
            return this._minutes;
    }

    set firstname(firstname:string) {
        this._firstname = firstname;
}

    set minutes(minutes:number) {
             this._minutes = minutes;
    }

    set balance(balance:number) {
        this._balance = balance;
    }

    public ricarica(unaRicarica:number):void {
        this._balance += unaRicarica;
    }

    public chiamata(minutiDurata:number):void {
        this._minutes = minutiDurata;
    }

    public getNumeroChiamate():number {
        return this._calls++;
    }

    public numero404():number {
        return this._balance;
    }

    public azzeraChiamate():void {
        this._calls = 0;
        this._balance = 0;
        this.minutes = 0; 
    }
}

let FirstUser = new Smartphone("John" , 50, 0, 0);
let SecondUser = new Smartphone("Tim" , 20, 0, 0);
let ThirdUser = new Smartphone("Mary" , 70, 0, 0);
let users:Smartphone[] = [];
    users.push(FirstUser,SecondUser,ThirdUser)
    console.log(users)

document.addEventListener('DOMContentLoaded', () => {
    let users:Smartphone[] = [];
    users.splice(0,3);
    let json1 = localStorage.getItem('John');
    if(json1 !== null){
        users[0] = JSON.parse(json1);
        
    }
    let json2 = localStorage.getItem('Tim');
    if(json2 !== null){
        users[1] = JSON.parse(json2);
    }
    let json3 = localStorage.getItem('Mary');
    if(json3 !== null){
        users[2] = JSON.parse(json3);
    }
    
    
});

let myInterval:number;
let minutiDurata:number;
let secs:number;
let mins:number;
let hrs:number;
let credit:number;
let CreditAvailable:boolean;

function reset2(User:Smartphone) {
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    amount.value = '';
    let box = document.querySelector('.'+ User.firstname +'');
        if(box !== null){
            box.innerHTML = '';
            }  
}

function leadingzero(i:any) {
    if (i < 10) {i = '0'+ i}; 
    return i;
  }

function startcall(User:Smartphone) {

    
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
        let number = amount.value;
        console.log(number);
        if (number !== '') {
            if (User.balance > 0) {
                let box = document.querySelector('.'+ User.firstname +'');
                if(box !== null){
                    box.innerHTML = `Calling.......`
                    }   
                secs = leadingzero(0);
                mins = leadingzero(0);
                hrs = leadingzero(0);
                minutiDurata = User.minutes;
                minutiDurata++;
                credit = User.balance - .2;
                setTimeout(() => { myInterval =setInterval(function() {    
                    secs++
                    secs = leadingzero(secs);
                    if (secs >=60) {
                        minutiDurata++;
                        credit = credit- .2;
                        secs = leadingzero(0);
                        mins++;
                        mins = leadingzero(mins);
                    }
                    if (mins >=60) {
                
                        mins = leadingzero(0);
                        hrs++;
                        hrs = leadingzero(hrs);
                    }
                    
                    if(box !== null){
                        box.innerHTML = ` ${hrs} : ${mins} : ${secs}`      
                        } 
                    
                    if (credit <= 0) {
                        endcall(User);
                        alert("Credit ran out!")
                    }  
                }, 1000);
            },1000) 
        }
        else {
            alert('Not enough Credit to make call. Please top up')
        }
    }   
    else {
        alert("must enter a number");
    }
}

function endcall(User:Smartphone) {
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    if (amount.value !== '') {
        console.log(User.balance.toFixed(2));
        clearInterval(myInterval);
        User.getNumeroChiamate();
        User.balance = credit;
        User.minutes = minutiDurata; 
        printdata(User);
    }
    else {
        alert('No number called. Please insert number');
    }
        
}

function reset(User:Smartphone) {
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    amount.value = '';
    clearInterval(myInterval);
    User.azzeraChiamate();
    let box = document.querySelector('.'+ User.firstname +'');
    if(box !== null){
        box.innerHTML = `Calls, minutes and balance reset to: ${User.balance.toFixed(2)}`
        }                    
    let json = JSON.stringify(User);
    localStorage.setItem(''+ User.firstname +'', json);
    
}

function printdata(User:Smartphone) {
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    amount.value = `${User.minutes}`;
    let box = document.querySelector('.'+ User.firstname +'');
    if(box !== null){
        box.innerHTML = `Total minutes over all calls:`
        }                    
    let json = JSON.stringify(User);
    localStorage.setItem(''+ User.firstname +'', json);
}

function balance(User:Smartphone) {
    let json1 = localStorage.getItem(''+User+'');
    if(json1 !== null){
    User = JSON.parse(json1);
    // console.log(json1);
    }
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    amount.value = `${User.balance.toFixed(2)}`
    let box = document.querySelector('.'+ User.firstname +'');
    if(box !== null){
        box.innerHTML = `Balance: `
    }                    
}

function calllog(User:Smartphone) {
    let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    amount.value = `${User.calls}`
    let box = document.querySelector('.'+ User.firstname +'');
    if(box !== null){
        box.innerHTML = `Calls: `
    }                    
}

function topUp(User:Smartphone) {
    let box = document.querySelector('.'+ User.firstname +'');
    if(box !== null){
        if (box.innerHTML === '') {
            let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
            if(amount !== null){
                let number = amount.value;
                console.log(number);
                if (number !== '') {
                    User.ricarica(parseInt(number));
                } else {
                    alert("must enter a number");
                }
                amount.value = `${User.balance.toFixed(2)}`;
            }
            if(box !== null){
                box.innerHTML = `Balance:`
                // box.append(data);
                let json = JSON.stringify(User);
                localStorage.setItem(''+ User.firstname +'', json);
            }
        }else { 
            reset2(User)
            alert("must enter a number");
        }
    }  
}

function getnumber(User:Smartphone, param:string) {
	let amount = <HTMLInputElement>document.querySelector('input[name="' + User.firstname + '"]')
    amount.value +=  param;
}

















// class User1 extends Smartphone {

//     constructor(firstname:string, balance:number, minutes:number, calls:number) {
//         super(firstname,balance,minutes,calls);
       
//     }

//     public ricarica(unaRicarica:number):void {
        
//     }

//     public calculateMins(minutes:number) {
//         this.minutes=minutes;
//     }

//     public calculatebal(minutes:number) {
//         this.minutes=minutes;
//     }

//     public reset(minutes:number) {
//         this.minutes=minutes;
//     }
// }

// let user1 = new User1("John" , 100, 66, 12);
// console.log(user1.firstname);
// user1.minutes = 20000;
// console.log(user1.minutes);


