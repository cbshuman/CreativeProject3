let mainMenu =
	{
	images:'/mainmenu/menu',
	count:5,
	current:1,
	MoveRight()
		{
		if(this.current == this.count)
			{
			this.current = 1;
			}
		else
			{
			this.current += 1;
			}
		},
	MoveLeft()
		{
		if(this.current == 1)
			{
			this.current = this.count;
			}
		else
			{
			this.current -= 1;
			}
		},
	RunFunction(app)
		{
		//console.log(this.functions[this.current-1]);
		this.functions[this.current-1](app);
		},
	functions :
		[
		//Medicine
		function(app)
			{
			console.log("Opening stats. . .");
			app.gamestate = 'stats';
			},
		//Praise
		function(app)
			{
			app.pet.Praise();
			},
		//Food
		function(app)
			{
			},
		//Stats
		function(app)
			{
			//console.log("Opening stats. . .");
			app.gamestate = 'stats';
			},
		//Clean up
		function(app)
			{
			}
		],
	}

// create a Vue instance
let app = new Vue(
	{
	el: '#app',
	data:
		{
		gamestate : 'starting',
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
				this.happinness -=  Math.floor(Math.random() * 15);
				if(this.happinness < 100)
					{
					this.happiness = 100;
					}
				console.log("Your pet is praised: " + this.happiness);
				},
			Update()
				{
				let seed = Math.floor(Math.random() * 100);
				if(seed >= 75)
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
				if(this.hunger < 50)
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
				this.menu.MoveLeft();
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
				this.menu.MoveRight();
				}
			},
		}
	}
);
