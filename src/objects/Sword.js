/*
 * Sword
 * =====
 *
 * a test sword okay
 */

export default class Sword extends Phaser.Sprite 
{

	constructor(game, ...args) 
	{
		super(game, 0, 0, 'sword', ...args);
		
		this.lifetime = 300;
		
		this.game.physics.arcade.enable(this);
		
		this.checkWorldBounds = false;
		this.outOfBoundsKill = false;
		
		this.owner = null;
		
		// graphics props
		this.anchor.setTo(0.5, 1.3);
		this.animations.add('swing');
	}

	reset()
	{
		super.reset();
		
		
	}
	
	init(xPos, yPos, dir, owner)
	{
		this.owner = owner;
		this.angle = dir * 45;
		
		this.x = xPos;
		this.y = yPos;
		
		this.animations.play('swing', this.lifetime/5, false);
		
		// kill timer
		this.game.time.events.add(this.lifetime, this.kill, this);
	}
	
	update() 
	{
		var coll = this.game.physics.arcade.overlap(this, this.game.state.states.Game.layer);
	}
}
