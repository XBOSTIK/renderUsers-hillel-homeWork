const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};


const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,//10
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 55,//50
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,//75
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 30,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78, //78
				"studentsScore": 79//79
			},
			{
				"title": "Java Enterprise",
				"score": 85, //85
				"studentsScore": 85 //85
			}
		]
	}, 
	{
		name: "Leo Burg",
		age: 60,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Basic",
				"score": 1, //78
				"studentsScore": 1//79
			}
		]
	}
];

class User{
	constructor(obj){
		for(let key in obj){
            this[key] = obj[key];
        }
	}

	render(){
		let renderUserInfo = `
            <div class="user__info">
                <div class="user__info--data">
                    <img src="images/users/${this.img}.png" alt="{${this.name}}" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role student">
                    <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
        </div>
		`

		return document.write(`
		<div class="users">
			<div class="user">
				${renderUserInfo} 
				${this.renderCourses()}
			</div>
		</div>`)
	}

	renderCourses(){
		if(this.courses){
			let fullString;
			let str = ``;
			for(let key in this.courses){
				let arr = this.courses[key];
				str += `<p class="user__courses--course student">${arr.title}<span class="${this.scoreRender(arr.mark)}">${this.scoreRender(arr.mark)}</span></p>`
			}
			fullString = `<div class="user__courses"> ${str} </div>`
			return fullString;
		} else {
			return ``;
		}
	}

	scoreRender(arr){
		let marks;
		for(let key in gradation){
			if(arr <= key){
				marks =  gradation[key]
				return marks;
			} else if (arr > 100){
				return marks = arr;
			}
		}
	}

}


class Student extends User {
	constructor(obj){
		super(obj);
	}
}


class Lector extends User {
	constructor(obj){
		super(obj);
	}
	renderCourses(){
		let coursesArray = this.courses;
		let lectorString = ``;
	
		for(let key in coursesArray){
			let arr = coursesArray[key]
			lectorString += `
			<div class="user__courses--course lector">
				<p>Title: <b>${arr.title}</b></p>
				<p>Lector's score: <span class="${this.scoreRender(arr.score)}">${this.scoreRender(arr.score)}</span></p>
				<p>Average student's score: <span class="${this.scoreRender(arr.studentsScore)}">${this.scoreRender(arr.studentsScore)}</span></p>
			</div>
			`
		}

		return `
			<div class="user__courses admin--info">
				${lectorString}
			</div>
		`
	}

}


class Admin extends User {
	constructor(obj){
		super(obj);
	}

	renderCourses(){
		let coursesArray = this.courses;
		let adminString =``;

		coursesArray.map(item => {
			adminString += `
			<div class="user__courses--course admin">
				<p>Title: <b>${item.title}</b></p>
				<p>Admin's score: <span class="${this.scoreRender(item.score)}">${this.scoreRender(item.score)}</span></p>
				<p>Lector: <b>${item.lector}</b></p>
			</div>
			`
		})

		let fullString = `
		<div class="user__courses admin--info">
			${adminString}
		</div>
		`
		return fullString
	}

}

const usersClasses = {
    lector: userObj => new Lector(userObj),
    student: userObj => new Student(userObj),
    admin: userObj => new Admin(userObj),
}

let updateUsers = users
	.map(user => {
		return usersClasses[user.role] ? usersClasses[user.role](user) : new User(user);
	})
	updateUsers.forEach(user => user.render())


