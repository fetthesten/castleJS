/*
 * Player
 * ======
 *
 * player obj
 */

export default class Player extends Phaser.Sprite 
{

	constructor(game, ...args) 
	{
		super(game, ...args);
		
		// graphics props
		this.anchor.setTo(0.5, 0.5);

		// physics props
		this.game.physics.arcade.enable(this);
		this.body.bounce.y = 0;
		this.body.gravity.y = 0;
		this.body.collideWorldBounds = true;
				
		// custom attributes
		this.lastDir = 4;			// 0-7, eight directions
		this.nextAttack = 0;		// next time player is allowed to attack
		this.attackCooldown = 300;	// ms between each attack
		
		// movement input
		this.movementSpeed = 150;
		this.deceleration = 100;
		this.maxMovementSpeed = 300;
		this.deadzone = 101;
		this.attacking = false;		// player should not be able to move while attacking
		
		// get reference to game cursor keys
		this.cursors = this.game.state.states.Game.cursors;
		this.keys = this.game.state.states.Game.keys;
		
		// signals
		this.attackSignal = new Phaser.Signal();
	}

	update() 
	{
		var moveX = this.cursors.left.isDown ? -1 : this.cursors.right.isDown ? 1 : 0;
		var moveY = this.cursors.up.isDown ? -1 : this.cursors.down.isDown ? 1: 0;
		
		this.attack(this.keys['attack'].isDown);
		
		this.move(moveX, moveY);
	}
	
	move(moveX, moveY)
	{
		if (moveY === -1)		// moving upwards
			this.lastDir = moveX === -1 ? 7 : moveX === 1 ? 1 : 0;
		else if (moveY === 0)	// no vertical movement
			this.lastDir = moveX === -1 ? 6 : moveX === 1 ? 2 : this.lastDir;
		else if (moveY === 1)	// moving downwards
			this.lastDir = moveX === -1 ? 5 : moveX === 1 ? 3 : 4
		
		if (this.attacking)
		{
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
		else
		{
			// player movement
			this.body.velocity.x += this.movementSpeed * moveX;
			this.body.velocity.y += this.movementSpeed * moveY;
			
			//speed cap
			this.body.velocity.x = this.body.velocity.x > 0 ? Math.min(this.body.velocity.x, this.maxMovementSpeed) : this.body.velocity.x < 0 ? Math.max(this.body.velocity.x, -this.maxMovementSpeed) : this.body.velocity.x;
			this.body.velocity.y = this.body.velocity.y > 0 ? Math.min(this.body.velocity.y, this.maxMovementSpeed) : this.body.velocity.y < 0 ? Math.max(this.body.velocity.y, -this.maxMovementSpeed) : this.body.velocity.y;
			
			// deceleration
			this.body.velocity.x += moveX === 0 ? this.deceleration * -Math.sign(this.body.velocity.x) : 0;
			this.body.velocity.y += moveY === 0 ? this.deceleration * -Math.sign(this.body.velocity.y) : 0;
			
			this.body.velocity.x = this.body.velocity.x > -this.deadzone && this.body.velocity.x < this.deadzone ? 0 : this.body.velocity.x;
			this.body.velocity.y = this.body.velocity.y > -this.deadzone && this.body.velocity.y < this.deadzone ? 0 : this.body.velocity.y;
		}
	}
	
	attack(attackButtonPressed)
	{
		if (this.game.time.now >= this.nextAttack && attackButtonPressed)
		{
			// initiate attack, 
			this.attacking = true;
			this.nextAttack = this.game.time.now + this.attackCooldown;
			this.attackSignal.dispatch(this.x, this.y, this.lastDir, 'Sword', this);
		}
		else if (this.game.time.now >= this.nextAttack && !attackButtonPressed)
		{
			this.attacking = false;
		}
	}
}