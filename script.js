let foodMenu =
	{
	images:'/mainmenu/food',
	count:3,
	current:1,
	MoveRight(app)
		{
		if(this.current == this.count)
			{
			this.current = 1;
			}
		else
			{
			this.current += 1;
			}
		app.currentMessage = this.functions[this.current-1].label;
		},

	MoveLeft(app)
		{
		if(this.current == 1)
			{
			this.current = this.count;
			}
		else
			{
			this.current -= 1;
			}
		app.currentMessage = this.functions[this.current-1].label;
		},

	RunFunction(app)
		{
		//console.log(this.functions[this.current-1]);
		this.functions[this.current-1].action(app);
		},
	functions :
		[
		{label: "Back",action : function(app)
			{
			app.menu = mainMenu;
			app.menu.current = 1;
			}},
		//Donut
		{label: "Donut",action : function(app)
			{
			app.currentMessage = 'Fed Donut!';
			app.menu = mainMenu;
			app.menu.current = 1;
			app.pet.Feed(15,-5,5);
			}},
		//Veggie
		{label: "Veggie",action : function(app)
			{
			app.currentMessage = 'Fed Veggie!';
			app.menu = mainMenu;
			app.menu.current = 1;
			app.pet.Feed(15,5,-5);
			}},
		],
	}

let mainMenu =
	{
	images:'/mainmenu/menu',
	count:5,
	current:1,
	MoveRight(app)
		{
		if(this.current == this.count)
			{
			this.current = 1;
			}
		else
			{
			this.current += 1;
			}
		app.currentMessage = this.functions[this.current-1].label;
		},

	MoveLeft(app)
		{
		if(this.current == 1)
			{
			this.current = this.count;
			}
		else
			{
			this.current -= 1;
			}
		app.currentMessage = this.functions[this.current-1].label;
		},

	RunFunction(app)
		{
		//console.log(this.functions[this.current-1]);
		this.functions[this.current-1].action(app);
		},
	functions :
		[
		{label: "Medicine",action : function(app)
			{
			app.currentMessage = 'Gave a shot!';
			app.pet.Medicate();
			app.menu.current = 1;
			}},
		//Praise
		{label: "Praise",action : function(app)
			{
			app.currentMessage = 'Pleased your pet!';
			app.pet.Praise();
			}},
		//Food
		{label: "Food",action : function(app)
			{
			app.menu = foodMenu;
			app.menu.current = 1;
			}},
		//Stats
		{label: "Status",action : function(app)
			{
			//console.log("Opening stats. . .");
			app.gamestate = 'stats';
			}},
		//Clean up
		{label: "Clean",action : function(app)
			{
			app.currentMessage = 'Cleaned up mess!';
			}},
		],
	}

// create a Vue instance
let app = new Vue(
	{
	el: '#app',
	data:
		{
		gamestate : 'starting',
		currentMessage : 'Default String',
		timeout : 0,
		menu:
			{
			},
		pet:
			{
			type:'unknown',
			image: 'undefined',
			behavior: 'default',
			currentFrame: 1,
			forward: 1,
			hunger: 100,
			happiness: 100,
			health: 100,
			Praise()
				{
				this.happiness -=  Math.floor(Math.random() * 15);
				if(this.happiness < 100)
					{
					this.happiness = 100;
					}
				},
			Medicate()
				{
				if(this.health < 50)
					{
					this.health = 100;
					}
				else
					{
					this.health = 50;
					}
				},
			Feed(hungerModify, healthModify, happinessModify)
				{
				this.hunger += hungerModify;
				this.health += healthModify;
				this.happiness += happinessModify;

				if(this.hunger > 100)
					{
					this.hunger = 100;
					}
				if(this.happiness > 100)
					{
					this.happiness = 100;
					}
				if(this.health > 100)
					{
					this.health = 100;
					}

				if(this.hunger < 0)
					{
					this.hunger = 0;
					}
				if(this.happiness < 0)
					{
					this.happiness = 0;
					}
				if(this.health < 0)
					{
					this.health = 0;
					}
				},
			Update()
				{
				let seed = Math.floor(Math.random() * 100);
				if(seed >= 90)
					{
					this.hunger -= Math.floor(Math.random() * 5);
					this.happiness -= Math.floor(Math.random() * 3);
					this.health -= Math.floor(Math.random() * 1);
					}
				if(this.hunger < 0)
					{
					this.hunger = 0;
					}
				if(this.happiness < 0)
					{
					this.happiness = 0;
					}
				if(this.health < 0)
					{
					this.health = 0;
					}
				},
			GetHeath()
				{
				if(this.health < 50)
					{
					return('sick');
					}
				else if(this.hunger < 50)
					{
					return('hungry');
					}
				else if(this.happiness < 50)
					{
					return('unhappy');
					}
				else
					{
					return('healthy');
					}
				}
			},
		},
	watch:
		{
		gamestate:function()
			{
			//console.log("Going this way");
			if(this.gamestate === 'bedroom')
				{
				this.menu = mainMenu;
				this.currentMessage = 'Bedroom';
				}
			}
		},

	mounted: function()
		{
		setInterval(this.UpdatePet, 125);
		},

	methods:
		{
		UpdatePet()
			{
			//console.log(this.pet.currentFrame);
			if(this.gamestate === 'bedroom')
				{
				//Do animation
				if(this.pet.currentFrame === 4 )
					{
					this.pet.forward = -1;
					}
				else if(this.pet.currentFrame === 1)
					{
					this.pet.forward = 1;
					}
				this.pet.currentFrame += this.pet.forward;

				//Update stats
				if(this.pet.currentFrame === 4)
					{
					this.pet.Update();
					}
				}
			},
		//Input from start button
		pressedStart()
			{
			if(this.gamestate === 'starting')
				{
				this.gamestate = 'choose';
				}
			else if(this.gamestate === 'choose')
				{
				}
			else if(this.gamestate === 'stats')
				{
				this.gamestate = 'bedroom';
				}
			else if(this.gamestate === 'bedroom')
				{
				this.menu.RunFunction(this);
				}
			},
		//Input from A button
		pressedA()
			{
			if(this.gamestate === 'choose')
				{
				this.gamestate = 'bedroom';
				this.pet.type = 'A';
				this.pet.image = '/pet_a/';
				}
			else if(this.gamestate === 'bedroom')
				{
				this.menu.MoveLeft(this);
				}
			},
		//Input from B button
		pressedB()
			{
			if(this.gamestate === 'choose')
				{
				this.gamestate = 'bedroom';
				this.pet.type = 'B';
				this.pet.image = '/pet_b/';
				}
			else if(this.gamestate === 'bedroom')
				{
				this.menu.MoveRight(this);
				}
			},
		}
	}
);
