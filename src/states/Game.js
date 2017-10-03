/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

// objects
import Player from '../objects/Player';
import Sword from '../objects/Sword';

// systems
import Pools from '../objects/Pools';
 
export default class Game extends Phaser.State 
{

	create() 
	{
		this.game.stage.backgroundColor = "#1e3444";
		
		// tilemap test
		var map = this.game.add.tilemap('data/test_map', 32, 32);
		map.addTilesetImage('tileset');
		map.setCollision(1);
		this.layer = map.createLayer(0);
		this.layer.resizeWorld();
		
		// player test
		var bmd = this.game.add.bitmapData(32,32);
		bmd.ctx.beginPath();
		bmd.circle(16,16,16);
		bmd.ctx.fillStyle='#00ff00';
		bmd.ctx.fill();
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.keys = this.game.input.keyboard.addKeys({ 'attack': Phaser.KeyCode.Z });
				
		this.player = new Player(this.game,1024,1096,bmd);
		this.game.add.existing(this.player);
		
		this.game.camera.follow(this.player);
		
		this.game.spritePools = new Pools(this.game, 
		{
			'Sword':
			{
				'class': Sword,
				'count': 5
			}
		});
		
		this.player.attackSignal.add(this.attack, this);
	}
	
	update()
	{
		this.game.physics.arcade.collide(this.player, this.layer);
		
	}
	
	attack(x, y, dir, weapon, owner)
	{
		var weapon = this.game.spritePools.getPool(weapon).getFirstDead(true);
		weapon.reset();
		weapon.init(x, y, dir, owner);
	}
}
