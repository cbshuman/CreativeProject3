
// create a Vue instance
let app = new Vue(
	{
	el: '#app',
	data:
		{
		gamestate : 'starting',
		},
	computed:
		{
		},
	methods:
		{
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
			else if(this.gamestate === 'bedroom')
				{
				}
			},
		//Input from A button
		pressedA()
			{
			if(this.gamestate === 'choose')
				{
				this.gamestate = 'bedroom';
				}
			else if(this.gamestate === 'bedroom')
				{

				}
			},
		//Input from B button
		pressedB()
			{
			if(this.gamestate === 'choose')
				{
				this.gamestate = 'bedroom';
				}
			else if(this.gamestate === 'bedroom')
				{

				}
			},
		}
	}
);
